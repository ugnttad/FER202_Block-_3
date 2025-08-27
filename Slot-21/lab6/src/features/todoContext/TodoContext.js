import { createContext, useContext, useMemo, useReducer } from 'react';
import { initialState, todoReducer } from './todoReducer';


const TodoCtx = createContext();


export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);
    return <TodoCtx.Provider value={value}>{children}</TodoCtx.Provider>;
}


export function useTodos() {
    const ctx = useContext(TodoCtx);
    if (!ctx) throw new Error('useTodos must be used within TodoProvider');
    return ctx;
}