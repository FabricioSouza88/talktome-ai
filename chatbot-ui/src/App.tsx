import React from "react";
import Chatbot from "./components/chatbot";

const App: React.FC = () => {
  return (
    <div style={styles.app}>
      <h2 style={styles.title}>Fabricio Souza - AI Assistent</h2>
      <Chatbot 
        apiUri="http://localhost:8002/chat"
        initialBotMessage="Olá, sou o assistente de IA de Fabricio Souza. O que deseja saber?" 
      />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "10px",
  },
};

export default App;
