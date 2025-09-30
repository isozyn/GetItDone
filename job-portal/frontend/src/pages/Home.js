import React from 'react';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Job Portal</h1>
    <p className="text-lg mb-8">Find your dream job or post new opportunities!</p>
    <div className="space-x-4">
      <a href="/jobs" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Browse Jobs</a>
      <a href="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Register</a>
      <a href="/login" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Login</a>
    </div>
  </div>
);

export default Home;
