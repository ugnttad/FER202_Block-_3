import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todo/todoSlice';
import { usersApi } from '../services/usersApi';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(usersApi.middleware),
});