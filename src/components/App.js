import { useEffect, useState } from "react";
import { Button, FormControl, Input, MenuItem, Select } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "../firebase";
import {
	addDoc,
	collection,
	serverTimestamp,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import styled from "styled-components";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [priority, setPriority] = useState("low");

	//when the app loads, we need to listen to the database and fetch new todos as they get added/removed

	useEffect(() => {
		const orderedTodos = query(collection(db, "todos"), orderBy("timestamp", "desc"));

		onSnapshot(orderedTodos, (snapshot) => {
			setTodos(
				snapshot.docs.map((doc) => {
					return { todo: doc.data().text, id: doc.id };
				})
			);
		});
	}, []);

	const addTodo = (event) => {
		event.preventDefault();

		//add the input to the database
		addDoc(collection(db, "todos"), {
			text: input,
			timestamp: serverTimestamp(),
		});

		//clear up the input field
		setInput("");
	};

	return (
		<div className="App">
			<h1>Todo List App with React!</h1>

			<FormControlStyled>
				<Input
					id="my-input"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="✅ Write a Todo"
				/>

				<Select
					value={priority}
					onChange={(event) => setPriority(event.target.value)}
					className="form__select"
				>
					<MenuItem value="low" className="select__item">
						Low 🟢
					</MenuItem>
					<MenuItem value="medium" className="select__item">
						Medium 🟡
					</MenuItem>
					<MenuItem value="high" className="select__item">
						High 🔴
					</MenuItem>
				</Select>

				<ButtonStyled disabled={!input} type="submit" onClick={addTodo} variant="contained">
					Add todo
				</ButtonStyled>
			</FormControlStyled>

			<ListStyled>
				{todos.map((todo) => {
					return <Todo todo={todo} />;
				})}
			</ListStyled>
		</div>
	);
}

export default App;

const FormControlStyled = styled(FormControl)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row !important;

	.form__select {
		margin-left: 10px !important;
	}
`;

const ButtonStyled = styled(Button)`
	margin-left: 10px !important;
`;

const ListStyled = styled.ul`
	padding: 0;
	width: 75%;
	margin: 0 auto;

	@media (max-width: 768px) {
		width: 100%;
	}
`;
