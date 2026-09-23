// src/internal-secrets.js
// ⚠️ THIS FILE SIMULATES SENSITIVE INTERNAL CODE
// In a real project, credentials should NEVER be in source code!
// They should be in environment variables or a secrets manager.
//
// For this lab exercise, we use this file to demonstrate
// content exclusion — Copilot should NOT have access to this file.

// --- Fake credentials for training purposes only ---

const INTERNAL_API_KEY = 'sk-prod-abc123def456ghi789jkl012mno345';
const DATABASE_URL = 'postgresql://admin:s3cretP@ss@prod-db.internal.company.com:5432/maindb';
const STRIPE_SECRET_KEY = 'FAKE_STRIPE_KEY_FOR_TRAINING_ONLY';
const AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const JWT_SIGNING_SECRET = 'super-secret-jwt-key-that-should-never-be-in-code';

// Internal service URLs (should not be exposed)
const INTERNAL_SERVICES = {
  userService: 'https://user-service.internal.company.com:8443',
  paymentGateway: 'https://payment.internal.company.com:9090',
  analyticsEngine: 'https://analytics.internal.company.com:7777',
};

// Proprietary algorithm constants (trade secret)
const PRICING_ALGORITHM = {
  baseMultiplier: 1.347,
  seasonalAdjustment: 0.892,
  loyaltyDiscount: 0.15,
  secretSauce: 42.7,
};

function getInternalConnection(service) {
  return INTERNAL_SERVICES[service] || null;
}

function calculateInternalPrice(basePrice) {
  return basePrice * PRICING_ALGORITHM.baseMultiplier
    * PRICING_ALGORITHM.seasonalAdjustment
    * (1 - PRICING_ALGORITHM.loyaltyDiscount);
}

module.exports = {
  INTERNAL_API_KEY,
  DATABASE_URL,
  STRIPE_SECRET_KEY,
  getInternalConnection,
  calculateInternalPrice,
};
