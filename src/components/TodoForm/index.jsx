import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "components/redux/todoSlice";
import "./styles.css";

const TodoForm = () => {
	//Creamos una variable de estado para este formulario, y luego una funcion que me permita ingresar un submit
	const [value, setvalue] = useState("");

	//Importamos el dispatch para poder enviar las acciones a nuestro store.
	const dispatch = useDispatch();

	const onFormSubmit = (event) => {
		event.preventDefault();
		dispatch(
			addTodoAsync({
				label: value,
			})
		);
	};

	return (
		//retornamos el componente del formulario como tal
		<div className="formbutton">
			<form action="" onSubmit={onFormSubmit} className="form-inline">
				<label htmlFor=""></label>
				<div className="inputFormButton">
					<input
						type="text"
						name=""
						id=""
						placeholder="Add todo"
						value={value}
						onChange={(event) => setvalue(event.target.value)}
						className="form-control mb-2 p-2"
					/>
					<button disabled={!value} type="submit" className="btn btn-primary p-2 mb-2">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default TodoForm;
