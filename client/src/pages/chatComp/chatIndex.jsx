import React, { useEffect } from "react";
import getSocket from "../../socket/socket";
const ChatIndex = () => {
  const socket = getSocket();
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to server", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Disconnected:", reason);
    });

    socket.on("message", (data) => {
      console.log("📩 Message from server:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-slate-900 h-screen text-white">
      <h1>Entry Point</h1>
    </div>
  );
};

export default ChatIndex;
