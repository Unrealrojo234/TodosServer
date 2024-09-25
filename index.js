require("dotenv").config();
const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const Todos = require("./models/ToDos.js");
const cors = require("cors");
const app = express();

const MongoDbUrl = process.env.MONGO_DB_URL;

//Express Middlewares
app.use(express.json());
app.use(cors());

//Server root
app.get("/", (req, res) => {
  res.send(`<h1>Simple Todo List Server</h1>`);
});

//Getting Data from the Database
app.get("/list", async (req, res) => {
  try {
    const todos = await Todos.find({});

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Posting Data to the Database
app.post("/list", async (req, res) => {
  try {
    const todos = await Todos.create(req.body);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Deleting Data from the database
app.delete("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await Todos.findByIdAndDelete(id);

    res.status(404).json({ message: "Item Not Found" });

    res.status(200).json(todos);

    console.log("Item Deleted Successfully");
  } catch (error) {
    res.status(500).json({ message: error.mongoose });
  }
});

//Updating Data from the DataBase
app.put("/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todos.findByIdAndUpdate(id, req.body, { new: true });

    res.status(404).json({ message: "Item Not Found" });

    res.status(200).json({ updated: "Successfully" });

    console.log("Item Updated Successfully");
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
