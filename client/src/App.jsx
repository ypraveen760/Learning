import React from "react";
import ChatIndex from "./pages/chatComp/chatIndex";
import Login from "./pages/login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <>{isLoggedIn ? <ChatIndex /> : <Login setIsLoggedIn={setIsLoggedIn} />}</>
  );
}

export default App;
