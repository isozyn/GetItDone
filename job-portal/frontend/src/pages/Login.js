import React from 'react';

const Login = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form className="w-full max-w-xs">
      <input type="email" placeholder="Email" className="mb-2 p-2 w-full border rounded" />
      <input type="password" placeholder="Password" className="mb-4 p-2 w-full border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  </div>
);

export default Login;
