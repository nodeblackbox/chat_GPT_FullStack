const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
