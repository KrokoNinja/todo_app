import { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
import AddTodoModal from "./AddTodoModal";

function App() {
	const [todos, setTodos] = useState([]);
	const [open, setOpen] = useState(false);

	//when the app loads, we need to listen to the database and fetch new todos as they get added/removed

	useEffect(() => {
		const orderedTodos = query(collection(db, "todos"), orderBy("timestamp", "desc"));

		onSnapshot(orderedTodos, (snapshot) => {
			setTodos(
				snapshot.docs.map((doc) => {
					return { todo: doc.data().text, priority: doc.data().priority, id: doc.id };
				})
			);
		});
	}, []);

	const addTodo = (todoText, todoPriority) => {
		//add the input to the database
		addDoc(collection(db, "todos"), {
			text: todoText,
			priority: todoPriority,
			timestamp: serverTimestamp(),
		});

		setOpen(false);
	};

	return (
		<AppStyled>
			<h1 className="heading">Todo List App with React!</h1>

			<ButtonStyled variant="contained" onClick={() => setOpen(true)}>
				➕ Add Todo
			</ButtonStyled>

			<AddTodoModal open={open} onClose={() => setOpen(false)} onAdd={addTodo} />

			<ListStyled>
				{todos.map((todo) => {
					return <Todo todo={todo} />;
				})}
			</ListStyled>
		</AppStyled>
	);
}

export default App;

const AppStyled = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 75%;

	.heading {
		text-align: center;
	}
`;

const ButtonStyled = styled(Button)`
	align-self: flex-end !important;
`;

const ListStyled = styled.ul`
	padding: 0;
	width: 75%;
	margin: 0 auto;

	@media (max-width: 768px) {
		width: 100%;
	}
`;
