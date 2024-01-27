const mongoose = require("mongoose");

//creating schema for database
const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ToDo", toDoSchema);
