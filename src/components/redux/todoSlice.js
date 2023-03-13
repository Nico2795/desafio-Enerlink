import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//Definimos las funciones asincronas para hacer las peticiones http.
//Notificaciones de react-hot-toast configuradas mediante try-catch
export const getTodoAsync = createAsyncThunk("todos/getTodoAync", async () => {
	const res = await fetch("http://localhost:7000/todos");
	if (res.ok) {
		const todos = await res.json();
		return { todos };
	}
});

export const addTodoAsync = createAsyncThunk(
	"todos/addTodoAsync",
	async (payload) => {
		try {
			const res = await fetch("http://localhost:7000/todos", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ label: payload.label }),
			});
			if (res.ok) {
				const todo = await res.json();
				return { todo };
			}
		} catch (error) {
			toast.error("La llamada a la API ha fallado!");
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	"todos/toggleCompleteAsync",
	async (payload) => {
		try {
			const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ checked: payload.checked }),
			});
			if (res.ok) {
				const todo = await res.json();
				return { id: todo.id, checked: todo.checked };
			}
		} catch (error) {
			toast.error("No se puede marcar/desmarcar, no hay conexión!");
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	"todos/deleteTodoAsync",
	async (payload) => {
		try {
			const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				return { id: payload.id };
			}
		} catch (error) {
			toast.error("No se puede eliminar, no hay conexión!");
		}
	}
);

/* Slice va a contener el estado de la lista de tareas
 y las funciones que se utilizan para modificar el estado */
const todoSlice = createSlice({
	name: "todo",
	//Array de prueba
	initialState: [{ id: 1, label: "No hay conexión!😢", checked: false }],

	/* ---Reducers utilzados de prueba antes de definir la conexión--------*/
	/* 	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				//date.now para que sea unico
				id: Date.now(),
				label: action.payload.label,
				checked: false,
			};
			state.push(newTodo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].checked = action.payload.checked;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	} */
	extraReducers: {
		[getTodoAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].checked = action.payload.checked;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

/* export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions; */
export default todoSlice.reducer;
