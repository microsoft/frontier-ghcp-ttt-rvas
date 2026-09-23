/**
 * Auth Middleware — Context Experiment
 * =====================================
 * 
 * Open this file alongside routes/users.js to see if Copilot
 * adds authentication to the route handlers.
 */

// Simple token-based auth middleware
// In a real app, this would verify JWTs or session tokens
function requireAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // Simple demo: any non-empty token is "valid"
  // In production: verify JWT, check expiration, etc.
  if (token.startsWith("Bearer ")) {
    req.user = { authenticated: true, token: token.slice(7) };
    return next();
  }

  return res.status(401).json({ error: "Invalid token format. Use: Bearer <token>" });
}

// Role-based access control middleware
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.authenticated) {
      return res.status(401).json({ error: "Authentication required" });
    }
    // In a real app, check user's role from database
    // For demo: we trust the token
    next();
  };
}

module.exports = { requireAuth, requireRole };
