// src/components/Auth.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // password is not used, just UI
  const { user, login, logout } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return alert("Enter a username");
    // Simulate successful login
    login({ username });
    setUsername("");
    setPassword("");
  };

  if (user) {
    return (
      <div>
        <span>Logged in as <b>{user.username}</b></span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default Auth;
