const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDb = require("./configs/db.js");
const { databaseUri } = require("./configs/var.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
const appRouterIndex = require("./router/index.router.js");
const { socketVerify } = require("./middleware/socketVerify.js");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

router.get("/health", (req, res) => {
  return res.status(200).json({
    message: "server working",
  });
});
app.use("/api", appRouterIndex);
app.use("/", router);
io.use(socketVerify);
io.on("connection", (socket) => {
  const user = socket.user;
  console.log("socket user ", user);
  if (!user) {
    console.log("unauthorized socket connection attempt ", {
      socketId: socket.id,
    });
    socket.disconnect();
    return;
  }
  console.log("user connected ", {
    socketId: socket.id,
    user: socket?.user?.userId || "unknown",
  });
  socket.emit("message", "Welcome to server");

  socket.on("disconnect", () => {
    console.log("user disconnected", {
      socketId: socket.id,
      user: socket?.user?.userId || "unknown",
    });
  });
});

connectDb(databaseUri);
server.listen(3000, () => {
  console.log("server listening on port 3000");
});
