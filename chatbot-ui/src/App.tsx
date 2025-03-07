import React from "react";
import Chatbot from "./components/chatbot";

const App: React.FC = () => {
  return (
    <div style={styles.app}>
      <h2 style={styles.title}>Chatbot IA</h2>
      <Chatbot />
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
