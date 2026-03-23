// const JWT = require("jsonwebtoken");
// const { jwtsecret } = require("../configs/var");

// module.exports.socketVerify = async (socket, next) => {
//   try {
//     const token = socket.handshake.auth.token;
//     console.log("socket token ", token);
//     if (!token) {
//       return next(new Error("access denide no token provided"));
//     }
//     const payload = JWT.verify(token, jwtsecret);
//     socket.user = payload;
//     console.log("socket user ", socket.user);
//     next();
//   } catch (error) {
//     console.log(error);
//     return next(new Error("error occured"));
//   }
// };
const JWT = require("jsonwebtoken");
const cookie = require("cookie");
const { jwtsecret } = require("../configs/var");

module.exports.socketVerify = async (socket, next) => {
  try {
    // 1️⃣ Get raw cookie
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("Unauthorized: No cookies found"));
    }

    // 2️⃣ Parse cookie
    const parsed = cookie.parse(rawCookie);

    const token = parsed.token;

    if (!token) {
      return next(new Error("Unauthorized: Token missing"));
    }

    // 3️⃣ Verify token
    const payload = JWT.verify(token, jwtsecret);

    // 4️⃣ Attach user
    socket.user = payload;

    console.log("✅ Socket authenticated:", {
      userId: payload.id,
      socketId: socket.id,
    });

    next();
  } catch (error) {
    console.error("🚨 Socket auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return next(new Error("Token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new Error("Invalid token"));
    }

    return next(new Error("Unauthorized"));
  }
};
