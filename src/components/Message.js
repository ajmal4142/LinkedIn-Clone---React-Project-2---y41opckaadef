import React, { useState, useEffect } from "react";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Simulated data for this example
  const simulatedMessages = [
    { id: 1, text: "Hello", sender: "user1" },
    { id: 2, text: "Hi there!", sender: "user2" },
    { id: 3, text: "How are you?", sender: "user1" },
  ];

  useEffect(() => {
    // Simulated receiving of messages from a server (use a real server in a production app)
    setMessages(simulatedMessages);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated sending a message to the server (use a real server in a production app)
    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user1",
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user1" ? "sent" : "received"
            }`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;
