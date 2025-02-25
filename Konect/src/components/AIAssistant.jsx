import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AIAssistant.css";

const AI_API_URL = "http://127.0.0.1:8000";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isServerHealthy, setIsServerHealthy] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Check server health on component mount and when opened
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${AI_API_URL}/health`);
        const data = await response.json();
        setIsServerHealthy(data.status === "healthy");
        setError(null);
      } catch (e) {
        setIsServerHealthy(false);
        setError("AI service is currently unavailable");
      }
    };

    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const getContextualGreeting = () => {
    const path = location.pathname.replace("/", "");
    const pageName = path.charAt(0).toUpperCase() + path.slice(1);
    return path === "login" || path === "register"
      ? "Welcome to Konect! How can I assist you today?"
      : `Exploring ${pageName}? Ask me anything!`;
  };

  const getContextualPlaceholder = () => {
    const path = location.pathname.replace("/", "");
    switch (path) {
      case "communities":
        return "Ask about communities, connections, or discover new groups...";
      case "events":
        return "Questions about events, schedules, or planning?";
      case "groups":
        return "Need help with groups, memberships, or activities?";
      case "dashboard":
        return "Ask about your stats, updates, or notifications...";
      default:
        return "Ask Nova anything...";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: getContextualGreeting(),
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, location.pathname]);

  const makeApiCall = async (query, retryCount = 0) => {
    try {
      const response = await fetch(`${AI_API_URL}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error);

      if (retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return makeApiCall(query, retryCount + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!isServerHealthy) {
      setError("AI service is currently unavailable. Please try again later.");
      return;
    }

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeApiCall(inputMessage);

      const assistantMessage = {
        text: data.response,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString(),
        contextUsed: data.context_used,
        relevantDocsCount: data.relevant_docs_count,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        "Sorry, I'm having trouble connecting to the AI. Please try again.";

      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Cannot connect to the AI server. Please make sure the server is running.";
      } else if (error.message.includes("API Error")) {
        errorMessage =
          "The AI server encountered an error. Please try again later.";
      }

      setError(errorMessage);

      const errorResponse = {
        text: errorMessage,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`ai-assistant ${isOpen ? "open" : ""}`}>
      <button
        className="ai-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Nova"
      >
        {isOpen ? "✕" : "🤖"}
        {!isOpen && <div className="assistant-label">Ask Nova</div>}
      </button>

      {isOpen && (
        <div className="ai-assistant-container">
          <div className="ai-assistant-header">
            <div className="header-content">
              <div className="assistant-avatar">🤖</div>
              <div className="assistant-info">
                <h3>Nova</h3>
                <span
                  className={`assistant-status ${error ? "error" : ""} ${
                    isServerHealthy ? "online" : "offline"
                  }`}
                >
                  {error
                    ? "Disconnected"
                    : isServerHealthy
                    ? "Ready to help"
                    : "Service Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="ai-assistant-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender} ${
                  message.sender === "assistant" ? "with-avatar" : ""
                } ${message.isError ? "error" : ""}`}
              >
                {message.sender === "assistant" && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-bubble">
                  <div className="message-content">{message.text}</div>
                  {message.contextUsed !== undefined && (
                    <div className="message-context-info">
                      {message.contextUsed
                        ? `Based on ${
                            message.relevantDocsCount
                          } relevant document${
                            message.relevantDocsCount !== 1 ? "s" : ""
                          }`
                        : "No relevant documents found"}
                    </div>
                  )}
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant with-avatar">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="ai-assistant-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={getContextualPlaceholder()}
              disabled={isLoading || !isServerHealthy}
            />
            <button
              type="submit"
              disabled={isLoading || !isServerHealthy}
              className="send-button"
            >
              {isLoading ? "..." : "↗️"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
