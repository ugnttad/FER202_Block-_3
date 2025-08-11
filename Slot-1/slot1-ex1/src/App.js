import logo from './logo.svg';
import './App.css';

function App() {
  const myName = "Dat";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Hello React</h1>
      <p className="text-lg text-gray-700">My name is, {myName}</p>
    </div>
  );
}

export default App;
