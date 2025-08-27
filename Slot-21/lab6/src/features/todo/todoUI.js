import { useState } from 'react';


export default function TodoUI({ items, stats, filter, onAdd, onToggle, onRemove, onFilter, label }) {
    const [text, setText] = useState('');
    return (
        <div style={{ maxWidth: 640, margin: '32px auto' }}>
            <h2>Todo – {label}</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Thêm việc..." />
                <button onClick={() => { if (text.trim()) { onAdd(text.trim()); setText(''); } }}>Thêm</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button onClick={() => onFilter('all')} disabled={filter === 'all'}>All</button>
                <button onClick={() => onFilter('active')} disabled={filter === 'active'}>Active</button>
                <button onClick={() => onFilter('done')} disabled={filter === 'done'}>Done</button>
            </div>
            <ul>
                {items.map(i => (
                    <li key={i.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="checkbox" checked={i.done} onChange={() => onToggle(i.id)} />
                        <span style={{ textDecoration: i.done ? 'line-through' : 'none' }}>{i.text}</span>
                        <button onClick={() => onRemove(i.id)} style={{ marginLeft: 'auto' }}>Xóa</button>
                    </li>
                ))}
            </ul>
            <p>Tổng: <b>{stats.total}</b> – Hoàn thành: <b>{stats.done}</b></p>
        </div>
    );
}