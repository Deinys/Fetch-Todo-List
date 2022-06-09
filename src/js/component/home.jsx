import React, { useState } from "react";
let initialState = { label: "", done: false };

const Home = () => {
	const [newtask, setnewtask] = useState("");
	const [task, settasks] = useState([]);
	const [error, setError] = useState(false);
	let URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";

	let getApi = async () => {
		try {
			let response = await fetch(`${URL_BASE}deinys`);
			let data = await response.json();
			settasks(data);
			console.log(task);
		} catch (error) {}
	};

	let addListApi = async () => {
		if (newtask.label.trim() == "") {
			setError(true);
		}
		try {
			let response = await fetch(`${URL_BASE}deinys`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...newtask, task]),
			});
			if (response.ok) {
				getApi();
				settasks({ ...task, ["label"]: "" });
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	let createUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}deinys`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				localStorage.setItem("user", JSON.stringify("deinys"));
				getApi();
			}
			console.log(response.status);
		} catch (error) {
			console.log(error);
		}
	};
	let deleteUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}deinys`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				localStorage.removeItem("user");
			}
		} catch (error) {
			console.log(error);
		}
	};

	function addtask() {
		settasks([...task, newtask]);
	}

	function deletask(index) {
		var duplicatearray = [...task];

		duplicatearray.splice(index, 1);

		settasks(duplicatearray);
	}

	const tasklist = task.map((object, index) => {
		return (
			<div className="row justify-content-center">
				<h1 className="col-md-6 text-left">{object}</h1>
				<button
					onClick={() => {
						deletask(index);
					}}
					className="col-md-1 btn btn-danger m-1">
					Delete
				</button>
			</div>
		);
	});

	return (
		<div className="home">
			<div className="container-sm">
				<h1 className="header">todos</h1>
				<div className="row justify-content-center">
					<input
						type="text"
						placeholder="What needs to be done?"
						className=" col-md-6 m-1"
						value={newtask}
						onChange={(e) => {
							setnewtask(e.target.value);
						}}
					/>
					<button
						onClick={addtask}
						className="btn btn-primary col-md-2 m-1">
						Add Task
					</button>
				</div>
				{tasklist}
			</div>
			<div className="count">{tasklist.length} item left</div>
		</div>
	);
};

export default Home;
