const JWT = require("jsonwebtoken");
const { jwtsecret } = require("../configs/var");

module.exports.verify = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers["authorization"]?.split(" ")[1] ||
      req.header("token");

    if (!token) {
      return res.status(401).json({
        message: "access denide no token provided",
      });
    }
    const payload = JWT.verify(token, jwtsecret);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "error occured",
    });
  }
};
