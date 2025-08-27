import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';


const initialState = { items: [], filter: 'all' };


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => { state.items.push(action.payload); },
            prepare: (text) => ({ payload: { id: nanoid(), text, done: false } }),
        },
        toggleTodo: (state, action) => {
            const t = state.items.find(i => i.id === action.payload);
            if (t) t.done = !t.done;
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        setFilter: (state, action) => { state.filter = action.payload; },
    }
});


export const { addTodo, toggleTodo, removeTodo, setFilter } = todoSlice.actions;


const selectTodoState = (s) => s.todo;
export const selectFilter = (s) => selectTodoState(s).filter;
export const selectItems = (s) => selectTodoState(s).items;
export const selectVisibleTodos = createSelector([selectItems, selectFilter], (items, filter) => {
    if (filter === 'active') return items.filter(i => !i.done);
    if (filter === 'done') return items.filter(i => i.done);
    return items;
});
export const selectStats = createSelector([selectItems], (items) => ({
    total: items.length,
    done: items.filter(i => i.done).length,
}));


export default todoSlice.reducer;