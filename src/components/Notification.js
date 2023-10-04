import React from "react";
import notification from "../images/notification.png";

function Notification() {
  return (
    <img
      src={notification}
      alt="message"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}

export default Notification;
