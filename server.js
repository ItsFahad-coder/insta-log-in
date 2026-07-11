const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Same folder se files serve karega jahan server.js hai
app.use(express.static(__dirname));

app.get("/login", (req, res) => {
  const { username, password } = req.body;

  res.send(`
    <html>
      <head><title>Gallery</title></head>
      <body style="background:#111; padding:20px;">
        <h1 style="color:#fff;">${(username, password)}!</h1>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

