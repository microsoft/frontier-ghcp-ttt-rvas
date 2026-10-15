const crypto = require('crypto');
const express = require('express');

const allowedStatuses = new Set(['proposed', 'accepted', 'superseded']);

function requiredStringError(input, field) {
  if (typeof input[field] !== 'string' || input[field].trim() === '') {
    return { field, message: `${field} must be a non-empty string` };
  }

  return null;
}

function validateDecision(input) {
  const errors = ['title', 'context', 'decision']
    .map((field) => requiredStringError(input, field))
    .filter(Boolean);

  if (
    input.status !== undefined
    && (typeof input.status !== 'string' || !allowedStatuses.has(input.status))
  ) {
    errors.push({
      field: 'status',
      message: 'status must be proposed, accepted, or superseded'
    });
  }

  return errors;
}

function createDecisionRouter() {
  const router = express.Router();
  const decisions = [];

  router.post('/', (request, response) => {
    const input = request.body && typeof request.body === 'object' && !Array.isArray(request.body)
      ? request.body
      : {};
    const errors = validateDecision(input);

    if (errors.length > 0) {
      return response.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: errors
        }
      });
    }

    const title = input.title.trim();
    const normalizedTitle = title.toLocaleLowerCase('en-US');
    const duplicate = decisions.some(
      (item) => item.title.toLocaleLowerCase('en-US') === normalizedTitle
    );

    if (duplicate) {
      return response.status(409).json({
        error: {
          code: 'DUPLICATE_TITLE',
          message: 'A decision with this title already exists'
        }
      });
    }

    const decision = {
      id: crypto.randomUUID(),
      title,
      context: input.context.trim(),
      decision: input.decision.trim(),
      status: input.status || 'proposed',
      createdAt: new Date().toISOString()
    };

    decisions.push(decision);
    return response.status(201).json({ data: decision });
  });

  return router;
}

module.exports = { createDecisionRouter, validateDecision };