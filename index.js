require("dotenv").config();
const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const Todos = require("./models/ToDos.js");

const app = express();

const MongoDbUrl = process.env.MONGO_DB_URL;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Simple Todo List Server</h1>`);
});

app.get("/list", async (req, res) => {
  try {
    const todos = await Todos.find({});

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/list", async (req, res) => {
  try {
    const todos = await Todos.create(req.body);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(MongoDbUrl)
  .then(() => console.log("Connected to the database successfully"))
  .catch((error) => console.log("Error", error));
