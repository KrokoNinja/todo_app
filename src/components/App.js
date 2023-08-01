import { useEffect, useState } from "react";
import { Button, FormControl, Input, MenuItem, Select, Modal, Box, FormLabel } from "@mui/material";
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
	const [priority, setPriority] = useState("Low 🟢");
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

	const addTodo = (event) => {
		event.preventDefault();

		//add the input to the database
		addDoc(collection(db, "todos"), {
			text: input,
			priority: priority,
			timestamp: serverTimestamp(),
		});

		//clear up the input field and close the modal
		setInput("");
		setPriority("Low 🟢");
		setOpen(false);
	};

	return (
		<AppStyled>
			<h1 className="heading">Todo List App with React!</h1>

			<Modal open={open} onClose={(e) => setOpen(false)}>
				<ModalStyled>
					<FormControlStyled>
						<FormLabel className="form__label">✍️ Add a todo</FormLabel>
						<div className="form__div">
							<FormControl>
								<Input
									value={input}
									onChange={(event) => setInput(event.target.value)}
									placeholder="✅ Write a Todo"
								/>
							</FormControl>
							<FormControl>
								<Select
									value={priority}
									onChange={(event) => setPriority(event.target.value)}
									className="form__select"
								>
									<MenuItem value="Low 🟢" className="select__item">
										Low 🟢
									</MenuItem>
									<MenuItem value="Medium 🟡" className="select__item">
										Medium 🟡
									</MenuItem>
									<MenuItem value="High 🔴" className="select__item">
										High 🔴
									</MenuItem>
								</Select>
							</FormControl>
							<Button
								disabled={!input}
								type="submit"
								onClick={addTodo}
								variant="contained"
								className="form__button"
							>
								Add todo
							</Button>
						</div>
					</FormControlStyled>
				</ModalStyled>
			</Modal>

			<ButtonStyled variant="contained" onClick={(e) => setOpen(true)}>
				➕ Add Todo
			</ButtonStyled>

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

const ModalStyled = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 75%;
	border: 2px solid #000;
	background-color: #fff;
	box-shadow: 24;
	transform: translate(-50%, -50%);
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 768px) {
		width: 90%;
	}
`;

const FormControlStyled = styled(FormControl)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column !important;

	.form__label {
		font-size: 1.5rem !important;
		margin-bottom: 30px !important;
	}

	.form__div {
		margin-bottom: 30px !important;

	.form__select {
		margin-left: 10px !important;
	}

	.form__button {
		margin-left: 10px !important;
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
