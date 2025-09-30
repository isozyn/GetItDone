import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
    <div className="font-bold text-xl">Job Portal</div>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/jobs" className="hover:underline">Jobs</Link>
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
    </div>
  </nav>
);

export default Navbar;
