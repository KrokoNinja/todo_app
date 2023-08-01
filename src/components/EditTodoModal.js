import { useState } from "react";
import { Modal, FormControl, FormLabel, Input, Select, MenuItem, Button, Box } from "@mui/material";
import styled from "styled-components";

function EditTodoModal({ todo, open, onClose, onUpdate }) {
	const [input, setInput] = useState(todo.todo);
	const [priority, setPriority] = useState(todo.priority);

	const handleUpdateTodo = () => {
		// Call the parent component's onUpdate function to update the todo
		onUpdate(todo.id, input, priority);
		// Close the modal
		onClose();
	};

	return (
		<Modal open={open}>
			<ModalStyled>
				<FormControl className="modal__form_control">
					<FormLabel className="form__label">✍️ Edit your todo</FormLabel>
					<div className="modal__input">
						<FormControl>
							<Input value={input} onChange={(event) => setInput(event.target.value)} />
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
						<Button disabled={!input} type="submit" onClick={handleUpdateTodo} className="update">
							Update Todo
						</Button>
					</div>
				</FormControl>
			</ModalStyled>
		</Modal>
	);
}

export default EditTodoModal;

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
