import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';

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
            
            toast.error('La llamada a la API ha fallado!');
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
            toast.error("No se puede marcar/desmarcar, no hay conexión!")
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
            toast.error("No se puede eliminar, no hay conexión!")
        }

	}
);

const todoSlice = createSlice({
	name: "todo",
	//Array de prueba
	initialState: [
		{ id: 1, label: "todo1", checked: false },
		{ id: 2, label: "todo2", checked: false },
		{ id: 3, label: "todo3", checked: true },
	],
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				//date.now para que sea unico
				id: Date.now(),
				label: action.payload.label,
				checked: false,
			};
			/* Con este push quedan asignados al final del array */
			state.push(newTodo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].checked = action.payload.checked;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
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

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
