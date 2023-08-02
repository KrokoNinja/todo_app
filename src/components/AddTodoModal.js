import React from "react";
import { useState } from "react";
import { Modal, FormControl, Input, MenuItem, Select, Button, FormLabel, Box } from "@mui/material";
import styled from "styled-components";

function AddTodoModal({ open, onClose, onAdd }) {
	const [input, setInput] = useState("");
	const [priority, setPriority] = useState("Low 🟢");

	const handleAddTodo = (event) => {
		// Call the parent component's onUpdate function to update the todo
		onAdd(input, priority);

		// Close the modal
		onClose();
	};

	return (
		<Modal open={open}>
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
							onClick={handleAddTodo}
							variant="contained"
							className="form__button"
						>
							Add todo
						</Button>
					</div>
				</FormControlStyled>
			</ModalStyled>
		</Modal>
	);
}
export default AddTodoModal;

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
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row !important;
	}

	.form__select {
		margin-left: 10px !important;
	}

	.form__button {
		margin-left: 10px !important;
	}
`;
