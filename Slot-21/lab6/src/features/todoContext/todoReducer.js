export const initialState = { items: [], filter: 'all' };


export function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return { ...state, items: [...state.items, { id: Date.now(), text: action.text, done: false }] };
        case 'TOGGLE':
            return { ...state, items: state.items.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
        case 'REMOVE':
            return { ...state, items: state.items.filter(t => t.id !== action.id) };
        case 'FILTER':
            return { ...state, filter: action.filter };
        default:
            return state;
    }
}