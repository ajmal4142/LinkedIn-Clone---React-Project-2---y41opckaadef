import React from "react";
import message from "../images/message.png";

function Message() {
  return (
    <img
      src={message}
      alt="message"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}

export default Message;
