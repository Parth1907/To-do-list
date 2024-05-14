let ToDoList = document.getElementById("ToDoList");
let Task = document.getElementById("name");
let updatedValue = document.getElementById("updateName");
let updatedValueForm = document.getElementById("updateForm");

fetch(`/showToDo`)
	.then((r) => r.json())
	.then((data) => {
		data.forEach((element) => {
			let li = document.createElement("li");
			li.innerHTML = `
			<p style="width:50vh">${element.description}</p>
			<div onclick="onUpdate(${element})">Edit</div> 
			<a href="/deleteToDo/${element._id}">Delete</a>
			`;
			li.style =
				"display:flex; align-items:center; justify-content:space-around;";

			ToDoList.appendChild(li);
		});
	});

function onUpdate(element) {
	fetch(`/getToDo?name=${element.id}`)
		.then(r=>console.log(r))
		// .then((r) => r.json())
		// .then((data) => {
		// 	updatedValueForm.style.display= "block";
		// 	updatedValue.value=data.description;
		// });
}


function addToDoList() {
	fetch(`/addToDo?name=${Task.value}`, {method: "get"})
		.then((r) => r.json())
		.then((data) => {
			let li = document.createElement("li");
			li.innerHTML = `
			<p style="width:50vh">${data.description}</p>
			<a href="/getToDo/${data._id}">Edit</a>
			<a href="/deleteToDo/${data._id}">Delete</a>
			`;
			li.style =
				"display:flex; align-items:center; justify-content:space-around;";
			ToDoList.appendChild(li);
		});
	Task.value = "";
}
