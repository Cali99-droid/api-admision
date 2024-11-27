export function checkRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.roles.includes(role)) {
      return next();
    }
    res.status(403).json({ message: "Acceso denegado." });
  };
}
