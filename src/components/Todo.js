import { ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import styled from "styled-components";
import EditTodoModal from "./EditTodoModal";

function Todo({ todo }) {
	const handleDeleteTodo = (event) => {
		event.preventDefault();
		deleteDoc(doc(db, "todos", todo.id));
	};

	const [open, setOpen] = useState(false);

	const handleUpdateTodo = (todoId, updatedText, updatedPriority) => {
		updateDoc(doc(db, "todos", todoId), {
			text: updatedText,
			priority: updatedPriority,
		});
		setOpen(false);
	};

	return (
		<>
			<ListItemStyled key={todo.id}>
				<ListItemText primary={todo.todo} secondary={todo.priority} />
				<EditIcon onClick={() => setOpen(true)} className="edit" />
				<EditTodoModal
					todo={todo}
					open={open}
					onClose={() => setOpen(false)}
					onUpdate={handleUpdateTodo}
				/>
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
