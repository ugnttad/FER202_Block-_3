import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, reset, selectCount } from './counterSlice';
import { useState } from 'react';


export default function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [step, setStep] = useState(5);


    return (
        <div style={{ maxWidth: 420, margin: '40px auto' }}>
            <h2>Counter (Redux Toolkit)</h2>
            <p style={{ fontSize: 24 }}>Giá trị: <b>{count}</b></p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => dispatch(decrement())}>-1</button>
                <button onClick={() => dispatch(increment())}>+1</button>
                <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value) || 0)} style={{ width: 80 }} />
                <button onClick={() => dispatch(incrementByAmount(step))}>+ step</button>
                <button onClick={() => dispatch(reset())}>Reset</button>
            </div>
        </div>
    );
}