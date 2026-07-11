const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Step 1: Login form submit yahan aayega
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username aur password dono zaroori hain.");
  }

  // /data page par redirect, values query string ke through bhejna
  res.redirect(
    `/data?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
  );
});

// Step 2: Naya route "/data" jo values show karega
app.get("/data", (req, res) => {
  const { username, password } = req.query;

  res.send(`
    <html>
      <head><title>Data</title></head>
      <body style="background:#111; padding:20px;">
        <h1 style="color:#fff;">Username: ${username}</h1>
        <h1 style="color:#fff;">Password: ${password}</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server chal raha hai port 3000 par"));
