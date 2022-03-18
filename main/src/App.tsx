import React from "react";
import ReactVerificationInput from "./react-verification-input";
import "./react-verification-input/style.css";

function App() {
  const style = {
    margin: "auto",
    display: "flex",
    padding: "2rem",
    borderRadius: 10,
    maxWidth: "350px",
    marginBottom: "2rem",
    alignItems: "center",
    background: "#ffffff",
    justifyContent: "center",
    border: "1px solid #ddd",
  };

  return (
    <div style={{background: "#F8f9f9", padding: "2rem"}}>
      <div
        style={{
          ...style,
          background: "#ffffff",
          border: "1px solid #ddd",
        }}
      >
        <ReactVerificationInput
          fields={6}
          style={{
            color: "#444",
          }}
          initialValue="123456"
          styleType="outlined"
          onChange={(value) => console.log("THE VALUE: ", value)}
        />
      </div>

      <div
        style={{
          ...style,
          background: "#fff",
          border: "1px solid #ddd",
        }}
      >
        <ReactVerificationInput password styleType="underlined" />
      </div>

      <div
        style={{
          ...style,
          background: "#7c8bdf",
        }}
      >
        <ReactVerificationInput fields={5} styleType="circled" />
      </div>

      <div
        style={{
          ...style,
          background: "#222C54",
        }}
      >
        <ReactVerificationInput styleType="squared" />
      </div>

      <div style={{paddingBottom: "20rem"}}></div>
    </div>
  );
}

export default App;
