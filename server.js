let express = require("express");
let mongoose = require("mongoose");
let Task = require("./task");
let app = express();
app.use(express.static("public"));

mongoose
	.connect(
		"" //write your mongodb cloud link here
	)
	.then(() => {
		console.log("connected to mongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

let toDoArray;

app.get("/showToDo", async (req, res) => {
	try {
		toDoArray = await Task.find();
		res.json(toDoArray);
	} catch (error) {
		console.log(error);
	}
});
app.get("/addToDo", async (req, res) => {
	let task = new Task({
		description: req.query.name,
	});
	await task.save();
	res.json(task);
});

app.get("/deleteToDo/:id", (req, res) => {
	let taskId = req.params.id;
	Task.findByIdAndDelete(taskId)
		.then((models) => {
			console.log(models);
		})
		.catch((error) => {
			console.log(error);
		});
	res.redirect("/");
});
app.get("/getToDo", (req, res) => {
	let taskId = req.query.id;
	Task.findById(taskId)
		.then((task) => {
			console.log(task);
			res.json(task.description)
		})
		.catch((error) => {
			console.log(error);
		});
});
app.get("/updateToDo", (req, res) => {
	let updatedTask = req.query.name;
	let taskId = req.query.id;
	Task.findByIdAndUpdate(taskId, updatedTask)
		.then((models) => {
			console.log(models);
		})
		.catch((error) => {
			console.log(error);
		});
	res.redirect("/");
});

app.listen(3001, () => {
	console.log("Server started");
});
