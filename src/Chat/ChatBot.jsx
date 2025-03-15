import React from "react";
import "./ChatBot.module.scss";
export default function ChatBot() {
  return (
    <div className="chat-container">
      <textarea
        className="chat-input"
        cols="30"
        rows="10"
        placeholder="Ask me anything"
      />
    </div>
  );
}
