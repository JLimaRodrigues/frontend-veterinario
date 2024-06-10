import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Login Page</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="username">Username</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
