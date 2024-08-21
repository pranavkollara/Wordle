import { allowedWords } from "./words/allowedWords.js";
import express from "express";
import cors from "cors";
// const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors());



import connectToDB from "./db/connectToDB.js";
import User from "./db/Models/UserModel.js";

app.listen(4000, () => {
  console.log("Server is running on port 4000");
    connectToDB();
});

app.get("/api/randomword", async (req, res) => {
  const time = new Date().getTime();
  console.log(time);
  try {
    const words = await allowedWords[
      Math.floor(Math.random() * allowedWords.length)
    ];
    console.log(new Date().getTime());
    res
      .status(200)
      .json({ word: words, responsetime: new Date().getTime() - time });
  } catch (err) {
    console.error(err || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/validateword", async (req, res) => {
  const { word } = req.body;
  try {
    const isValid = allowedWords.includes(word);
    res.status(200).json({ valid: isValid });
  } catch (err) {
    console.error(err || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/win", async (req, res) => {
  try {
    const {username,email} = req.body;
    const user = await User.findOne({$or: [{email}, {username}]})
    user.solvedWords += 1;
    user.attempts += 1;
    let time = new Date().getTime();
    let lastTry = user.lastAttempt;
    if(lastTry && time - lastTry < 180000){
      user.streak += 1;
    }else{
      user.streak = 1;
    }
    user.lastAttempt = time;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    
    console.error(err || err.message);
    res.status(500).json({ error: "Server error" });
  }
})

app.post("/api/incAttempt", async (req, res) => {
  try {
    const {username,email} = req.body;
    const user = await User.findOne({$or: [{email}, {username}]})
    user.attempts+=1;
    user.streak = 0;
    
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(err || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/addPlayerToDB", async (req, res) => {
  try {
    const {username,email,name ,id} = req.body;
    const user = new User({ id,username, email, solvedWords: 0, attempts: 0,name: name,streak:0 });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err || err.message);
    res.status(500).json({ error: "Server error" });
  }
})