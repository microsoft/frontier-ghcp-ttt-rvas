/**
 * Auth Middleware — Solution (same as starter, no changes needed)
 */

function requireAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (token.startsWith("Bearer ")) {
    req.user = { authenticated: true, token: token.slice(7) };
    return next();
  }

  return res.status(401).json({ error: "Invalid token format. Use: Bearer <token>" });
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.authenticated) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
