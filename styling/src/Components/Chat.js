// Chat.jsx
import React, { useState } from "react";
import "../css/Chat.css";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput) {
      setChatHistory([
        ...chatHistory,
        { sender: "user", message: userInput },
        { sender: "bot", message: "Fetching data..." }, 
      ]);
      setUserInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.sender === "user" ? "user" : "bot"}`}
          >
            {chat.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="chat-input"
          placeholder="Ask a question..."
        />
        <button type="submit" className="chat-submit-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
