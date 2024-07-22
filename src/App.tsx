import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./novuNotificationsService";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>To reproduce the behavior: </h1>
        <ol
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <li style={{ textAlign: "start" }}>
            Set your `YOUR_SUBSCRIBER_ID`, `YOUR_APPLICATION_IDENTIFIER` and
            `YOUR_SUBSCRIBER_HASH` in `src\novuNotificationsService\index.ts`
          </li>
          <li style={{ textAlign: "start" }}>Send several notifications</li>
          <li style={{ textAlign: "start" }}>
            Observe the `onPushNotifications` callback function is invoked on
            every new notification received with all actual notifications
          </li>
        </ol>
      </header>
    </div>
  );
}

export default App;
