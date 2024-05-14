const mongoose=require("mongoose");

let taskSchema = new mongoose.Schema({
    description: String,
})

module.exports=mongoose.model("Task",taskSchema);