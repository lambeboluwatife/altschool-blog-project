const jwt = require("jsonwebtoken");

exports.generateToken = async (req, res) => {
  jwt.sign(
    { user: req.user },
    "secretkey",
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Token generation failed",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    }
  );
};

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    if (bearer.length === 2) {
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Malformed token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Missing Authorization header",
    });
  }
};

// exports.verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     return res.status(403).json({
//       success: false,
//       message: "Forbidden",
//     });
//   }
// };
