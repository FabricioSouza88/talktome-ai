import React, { useState } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  apiUri: string;
  initialBotMessage?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialBotMessage, apiUri }) => {
  const welcomeMessage: Message[] = initialBotMessage ? [{ sender: "bot", text: initialBotMessage }] : [];
  const [messages, setMessages] = useState<Message[]>(welcomeMessage);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<{ response: string }>(
        apiUri,
        { question: input }
      );

      const botMessage: Message = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Erro ao obter resposta." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              backgroundColor: msg.sender === "user" ? "#007AFF" : "#E5E5EA",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              color: msg.sender === "user" ? "white" : "black",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>Digitando...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
          placeholder="Digite sua pergunta..."
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          ➤
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatContainer: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "500px",
    margin: "auto",
    background: "#fff",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  message: {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "15px",
    margin: "5px 0",
    fontSize: "14px",
  },
  loading: {
    fontSize: "12px",
    color: "#888",
    textAlign: "center",
    marginBottom: "5px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    outline: "none",
  },
  sendButton: {
    background: "#007AFF",
    color: "white",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default Chatbot;
