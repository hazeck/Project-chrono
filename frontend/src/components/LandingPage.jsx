import React from "react";

function LandingPage({ onEnter }) {
  return (
    <div className="landing-page" style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",   // Align to the top left
      justifyContent: "flex-start", // Align to the top
      padding: "40px 0 0 0",       // Top padding for some space
    }}>
      <h1 style={{ marginBottom: "0.2em" }}>Welcome to Chrono</h1>
      <p style={{
        color: "#444",
        maxWidth: 420,
        margin: 0,
        marginBottom: "2em",
        textAlign: "left"
      }}>
        Track your habits, save your daily highlights, and build better routines.<br />
        Clean, simple, and made just for you.
      </p>
      <button style={{
        fontSize: "1.1em"
      }} onClick={onEnter}>
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
