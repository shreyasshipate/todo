const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

//we are using differnt address for running frontend and backend
//so we are using cross-origin-resource sharing (cors)
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

//we connect the database as mongodb using mongodb compass
mongoose
  .connect(
    "mongodb+srv://shreyasshipate:Shreyas%40123@cluster0.sz5aifj.mongodb.net/ToDo_DB"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
