import React, { useState, useEffect } from "react";
import axios from "axios";
import { cursorTo } from "readline";

function Chatbot() {
  // State for storing messages
  const [messages, setMessages] = useState([
    { role: "system", content: "Reverse the order of the noun phrases" },
    { role: "assistant", content: "How can I help you today" },
  ]);
  // State for storing user input
  const [inputMessage, setInputMessage] = useState("");

  // Function to send a new message to the server
  const sendMessage = async () => {
    try {
      // Send a POST request to the server with the input message
      const current_messages = messages;
      const new_message = { role: "user", content: inputMessage };
      current_messages.push(new_message);
      const response = await fetch(`http://127.0.0.1:5000/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: current_messages }),
      }); // Replace '/api/send-message' with your actual API endpoint{ messages: current_messages }); // Replace '/api/send-message' with your actual API endpoint
      const responseJson = await response.json();
      // Fetch updated messages after sending the message
      //   fetchMessages();
      setInputMessage("");

      setMessages(responseJson);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(messages);

  return (
    <div >
      <div className="bg-gray-300 w-full justify-center" >
        {messages.map((message, index) => (
          <div key={index} className="flex">
            {index != 0 && message.role === "assistant" && (
              <div className="text-black bg-red-300 rounded-lg mt-4 ml-8 w-fit justify-end"
              >
                {message["content"]}
              </div>
            )}
            {index != 0 && message.role === "user" && (
              <div className="flex text-black bg-blue-300 rounded-lg mt-4 ml-96 w-fit right-0 justify-start"
              >
                {message["content"]}
              </div>
            )}
          </div>
          // }
        ))}
      </div>
      <div >
        <input
        className="text-black w-9/12 justify-center"
          type="text"
          value={inputMessage}
          placeholder="Enter your message"
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
