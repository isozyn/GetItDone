import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="font-bold text-xl text-white">Job Portal</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* Home is now the dashboard for logged in users */}
                <Link to="/" className="text-white hover:text-indigo-200 transition font-medium">
                  Home
                </Link>
                {/* Browse Jobs is the jobs page */}
                <Link to="/jobs" className="text-white hover:text-indigo-200 transition font-medium">
                  Browse Jobs
                </Link>
                {/* Hide Check Status when logged in */}
                {/* Show Admin only for admin users */}
                {user.isAdmin && (
                  <>
                    <Link to="/Admin-Dashboard" className="text-white hover:text-indigo-200 transition font-medium">
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/users" className="text-white hover:text-indigo-200 transition font-medium">
                      Manage Users
                    </Link>
                    <Link to="/admin/classes" className="text-white hover:text-indigo-200 transition font-medium">
                      Manage Classes
                    </Link>
                      <Link to="/profile" className="text-white hover:text-indigo-200 transition font-medium">
                        Profile
                      </Link>
                  </>
                )}
                {/* User tabs for classes */}
                {(!user.isAdmin) && (
                  <>
                    <Link to="/my-classes" className="text-white hover:text-indigo-200 transition font-medium">
                      My Classes
                    </Link>
                    <Link to="/available-classes" className="text-white hover:text-indigo-200 transition font-medium">
                      Available Classes
                    </Link>
                    <Link to="/completed-classes" className="text-white hover:text-indigo-200 transition font-medium">
                      Completed Classes
                    </Link>
                      <Link to="/profile" className="text-white hover:text-indigo-200 transition font-medium">
                        Profile
                      </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white hover:text-indigo-200 transition font-medium">
                  Home
                </Link>
                <Link to="/jobs" className="text-white hover:text-indigo-200 transition font-medium">
                  Browse Jobs
                </Link>
                <Link to="/ngo/status" className="text-white hover:text-indigo-200 transition font-medium">
                  Check Status
                </Link>
                <Link 
                  to="/login" 
                  className="text-white hover:text-indigo-200 transition font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/ngo/register" 
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Register with NGO
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
