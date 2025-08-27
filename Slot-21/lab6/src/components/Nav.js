import { NavLink } from 'react-router-dom';


const linkStyle = ({ isActive }) => ({
    padding: '8px 12px', textDecoration: 'none', borderRadius: 6,
    background: isActive ? '#111' : '#eee', color: isActive ? '#fff' : '#111',
});


export default function Nav() {
    return (
        <nav style={{ display: 'flex', gap: 8, padding: 12, justifyContent: 'center' }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/counter" style={linkStyle}>Counter</NavLink>
            <NavLink to="/todo" style={linkStyle}>Todo</NavLink>
            <NavLink to="/users" style={linkStyle}>Users</NavLink>
        </nav>
    );
}