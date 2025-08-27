import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import CounterPage from './pages/CounterPage';
import TodoPage from './pages/TodoPage';
import UsersPage from './pages/UsersPage';


function Home() {
  return (
    <div style={{ lineHeight: 1.8 }}>
      <p>Chọn một ví dụ ở thanh Nav: Counter, Todo, Users.</p>
      <p><Link to="/counter">→ Counter</Link></p>
      <p><Link to="/todo">→ Todo (Context vs Redux)</Link></p>
      <p><Link to="/users">→ Users (RTK Query)</Link></p>
    </div>
  );
}


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Layout>
  );
}