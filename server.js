const express = require("express");
const app = express();

// Body parse karne ke liye middleware (zaroori hai)
app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(express.json()); // agar JSON bhej rahe ho to

// Simple HTML escape function (XSS se bachne ke liye)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).send("Username aur password dono zaroori hain.");
  }

  // Yahan par asal mein DB se check karo ki user exist karta hai aur password sahi hai
  // Example (dummy check):
  // const user = await User.findOne({ username });
  // if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
  //   return res.status(401).send("Galat username ya password.");
  // }

  const safeUsername = escapeHtml(username);

  res.send(`
    <html>
      <head><title>Gallery</title></head>
      <body style="background:#111; padding:20px;">
        <h1 style="color:#fff;">Welcome, ${safeUsername} your password is ${password}!</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server chal raha hai port 3000 par"));

