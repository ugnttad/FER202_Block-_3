import { useState } from 'react';
import TodoUI from '../features/todo/todoUI';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../app/store';
import { TodoProvider, useTodos } from '../features/todoContext/TodoContext';
import { addTodo, removeTodo, selectStats, selectVisibleTodos, setFilter, toggleTodo } from '../features/todo/todoSlice';


function TodoWithContext() {
    const { state, dispatch } = useTodos();
    const items = state.items.filter(i => state.filter === 'all' ? true : state.filter === 'active' ? !i.done : i.done);
    const stats = { total: state.items.length, done: state.items.filter(i => i.done).length };
    return (
        <TodoUI
            label="Context + useReducer"
            items={items}
            stats={stats}
            filter={state.filter}
            onAdd={(text) => dispatch({ type: 'ADD', text })}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onRemove={(id) => dispatch({ type: 'REMOVE', id })}
            onFilter={(f) => dispatch({ type: 'FILTER', filter: f })}
        />
    );
}

function TodoWithRedux() {
    const dispatch = useDispatch();
    const items = useSelector(selectVisibleTodos);
    const stats = useSelector(selectStats);
    const filter = useSelector(s => s.todo.filter);
    return (
        <TodoUI
            label="Redux Toolkit"
            items={items}
            stats={stats}
            filter={filter}
            onAdd={(text) => dispatch(addTodo(text))}
            onToggle={(id) => dispatch(toggleTodo(id))}
            onRemove={(id) => dispatch(removeTodo(id))}
            onFilter={(f) => dispatch(setFilter(f))}
        />
    );
}


export default function TodoPage() {
    const [mode, setMode] = useState('context');
    return (
        <div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={() => setMode('context')} disabled={mode === 'context'}>Dùng Context</button>
                <button onClick={() => setMode('redux')} disabled={mode === 'redux'}>Dùng Redux</button>
            </div>


            {mode === 'context' ? (
                <TodoProvider>
                    <TodoWithContext />
                </TodoProvider>
            ) : (
                // Lưu ý: Provider chính đã bọc ở main.jsx; ở đây chỉ demo có thể bọc riêng nếu tách rời trang
                <Provider store={store}>
                    <TodoWithRedux />
                </Provider>
            )}
        </div>
    );
}