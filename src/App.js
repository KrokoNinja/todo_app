import { useEffect, useState } from "react";
import { Button, FormControl, Input } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
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
				<ButtonStyled disabled={!input} type="submit" onClick={addTodo} variant="contained">
					Add todo
				</ButtonStyled>
			</FormControlStyled>

			<ul>
				{todos.map((todo) => {
					return <Todo todo={todo} />;
				})}
			</ul>
		</div>
	);
}

export default App;

const FormControlStyled = styled(FormControl)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;
	flex-direction: row;
`;

const ButtonStyled = styled(Button)`
	margin-left: 10px;
`;
