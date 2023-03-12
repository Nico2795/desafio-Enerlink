import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"
//Como es un default lo asigno al nombre todoReducer. 

export default configureStore({
    reducer:{
        /* Le asigno el nombre todos que va a hacer referencia a mi todo reducer */
        todos: todoReducer,
    }
})