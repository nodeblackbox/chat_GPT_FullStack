const express = require("express");
const { PythonShell } = require("python-shell");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // To parse JSON request bodies

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  const options = {
    mode: "text",
    pythonOptions: ["-u"], // To get unbuffered output
    scriptPath: "./", // Path to your Python script
    args: [message], // Pass the message as an argument to your Python script
  };

  PythonShell.run("chatScript.py", options, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error running Python script" });
      return;
    }
    res.json({ response: results[0] }); // Return the result to the frontend
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
