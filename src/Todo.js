import {
	FormControl,
	FormLabel,
	InputLabel,
	Input,
	List,
	ListItem,
	ListItemText,
	Modal,
	Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "./firebase";
import styled from "styled-components";

const styles = {
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 400,
		backgroundColor: "white",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		transform: "translate(-50%, -50%)",
	},
};

function Todo({ todo }) {
	const handleDeleteTodo = (event) => {
		event.preventDefault();
		deleteDoc(doc(db, "todos", todo.id));
	};

	const [open, setOpen] = useState(false);
	const [input, setInput] = useState(todo.todo);

	const updateTodo = (event) => {
		event.preventDefault();
		updateDoc(doc(db, "todos", todo.id), {
			text: input,
		});
		setOpen(false);
	};

	return (
		<>
			<Modal open={open} onClose={(e) => setOpen(false)}>
				<div style={styles.modal}>
					<FormControlStyled>
						<FormLabel className="form__label">✅ Edit your todo</FormLabel>
						<div className="modal__input">
							<Input
								id="my-input"
								value={input}
								onChange={(event) => setInput(event.target.value)}
							/>
							<Button disabled={!input} type="submit" onClick={updateTodo} className="update">
								Update Todo
							</Button>
						</div>
					</FormControlStyled>
				</div>
			</Modal>
			<ListStyled>
				<ListItem>
					<ListItemText primary={todo.todo} secondary="Dummy expire date 🕧" />
				</ListItem>
				<EditIcon onClick={(e) => setOpen(true)} className="edit" />
				<DeleteForeverIcon onClick={handleDeleteTodo} variant="contained" className="delete" />
			</ListStyled>
		</>
	);
}

export default Todo;

const ListStyled = styled(List)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 40px;
	flex-direction: row;

	.MuiSvgIcon-root {
		cursor: pointer;
		padding: 10px;
		border-radius: 50%;
		margin-left: 10px;
	}

	.delete {
		&:hover,
		&:focus {
			color: red;
			background-color: rgba(255, 0, 0, 0.1);
		}
	}

	.edit {
		&:hover,
		&:focus {
			color: blue;
			background-color: rgba(0, 0, 255, 0.1);
		}
	}
`;

const FormControlStyled = styled(FormControl)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;

	.form__label {
		margin-bottom: 20px;
	}

	.modal__input {
		.update {
			margin-left: 10px;
		}
	}
`;
