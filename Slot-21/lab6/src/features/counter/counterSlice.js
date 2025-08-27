import { createSlice } from '@reduxjs/toolkit';


const initialState = { value: 0 };


const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (s) => { s.value += 1; },
        decrement: (s) => { s.value -= 1; },
        incrementByAmount: (s, a) => { s.value += a.payload; },
        reset: (s) => { s.value = 0; },
    },
});


export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;