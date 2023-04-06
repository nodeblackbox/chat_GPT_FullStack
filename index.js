const express = require("express");
const { PythonShell } = require("python-shell");
const app = express();
const PORT = process.env.PORT || 3001;
const { spawn } = require("child_process");

app.use(express.json()); // To parse JSON request bodies

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
  console.log(message + "from /api/hello");
});

// app.post("/api/chat", (req, res) => {
//   const { message } = req.body;

//   const options = {
//     mode: "text",
//     pythonOptions: ["-u"], // To get unbuffered output
//     scriptPath: "./", // Path to your Python script
//     args: [message], // Pass the message as an argument to your Python script
//   };

//   console.log(message + "from /api/chat");

//   PythonShell.run("chatScript.py", options, (err, results) => {
//     console.log("Python script ran");
//     if (err) {
//       console.error(err);
//       console.log("Error running Python script PythonShell");
//       res.status(500).json({ error: "Error running Python script" });
//       return;
//     }
//     res.json({ response: results[0] }); // Return the result to the frontend
//     console.log("Python script ran successfully");
//   });

//   const pythonFiles = ["chatScript.py"];

//   pythonFiles.forEach((file) => {
//     const pythonProcess = spawn("python", [file]);
//     let dataStore = [];
//     pythonProcess.stdout.on("data", (data) => {
//       console.log(`stdout from 1 ${file}: ${data}`);
//       dataStore.push(data.toString());
//       console.log(dataStore);
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error(`stderr from 2 ${file}: ${data}`);
//     });

//     pythonProcess.on("close", (code) => {
//       console.log(`child process from 3 ${file} exited with code ${code}`);
//     });
//   });
// });

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  const options = {
    mode: "text",
    pythonOptions: ["-u"], // To get unbuffered output
    scriptPath: "./", // Path to your Python script
    args: [message], // Pass the message as an argument to your Python script
  };

  console.log(message + " from /api/chat");

  const pythonFiles = ["chatScript.py"];

  pythonFiles.forEach((file) => {
    const pythonProcess = spawn(
      "python",
      options.pythonOptions.concat([file], options.args)
    );
    let dataStore = [];

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout from 1 ${file}: ${data}`);
      dataStore.push(data.toString());
      console.log(dataStore);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr from 2 ${file}: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process from 3 ${file} exited with code ${code}`);
      res.send(dataStore); // Send the response back to the client
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// cli args
