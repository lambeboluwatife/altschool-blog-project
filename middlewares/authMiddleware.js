exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Please login to create a blog.",
  });
};
