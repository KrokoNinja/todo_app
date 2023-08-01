import {
	FormControl,
	FormLabel,
	Input,
	ListItem,
	ListItemText,
	Modal,
	Button,
	Box,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import styled from "styled-components";

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
				<ModalStyled>
					<FormControl className="modal__form_control">
						<FormLabel className="form__label">✍️ Edit your todo</FormLabel>
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
					</FormControl>
				</ModalStyled>
			</Modal>
			<ListItemStyled>
				<ListItemText primary={todo.todo} secondary="Dummy priority 🔴" />
				<EditIcon onClick={(e) => setOpen(true)} className="edit" />
				<DeleteForeverIcon onClick={handleDeleteTodo} variant="contained" className="delete" />
			</ListItemStyled>
		</>
	);
}

export default Todo;

const ListItemStyled = styled(ListItem)`
	display: flex;
	justify-content: space-between;
	align-items: center;
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

const ModalStyled = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50%;
	border: 2px solid #000;
	background-color: #fff;
	box-shadow: 24;
	transform: translate(-50%, -50%);

	@media (max-width: 768px) {
		width: 90%;
	}

	.modal__form_control {
		display: flex;
		justify-content: center;
		align-items: center !important;
		margin: 20px;

		.form__label {
			margin-bottom: 20px;
		}

		.modal__input {
			.update {
				margin-left: 10px;
			}
		}
	}
`;
