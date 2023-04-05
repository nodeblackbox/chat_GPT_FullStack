import { useState } from "react";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputMessage }),
    });
    const data = await response.json();
    setResponseMessage(data.response);
  };

  return (
    <div>
      <h1>React and Express Full Stack App with OpenAI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>Response: {responseMessage}</p>
    </div>
  );
}

export default App;
