
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState(user?.description || '');
  const [picture, setPicture] = useState(user?.picture || '');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.isVerified) {
      fetchJobHistory();
    }
  }, [user]);

  const fetchJobHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/users/job-history');
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch job history');
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = async () => {
    try {
      await axios.put('/users/profile', { description });
      toast.success('Description updated');
    } catch (error) {
      toast.error('Failed to update description');
    }
  };

  const handlePictureChange = async () => {
    try {
      await axios.put('/users/profile', { picture });
      toast.success('Picture updated');
    } catch (error) {
      toast.error('Failed to update picture');
    }
  };

  // ...existing code for landing page for non-logged-in users...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-16">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Job Portal Community"
            className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg border-4 border-indigo-200"
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
            Welcome to the Job Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-4">
            <span className="font-semibold text-indigo-700">Connecting communities with opportunities.</span> <br />
            Find work that fits your skills and schedule. Our platform helps you discover jobs, connect with NGOs, and build your future.
          </p>
          <p className="text-md text-gray-500 max-w-xl mx-auto text-center">
            <span className="font-semibold">How it works:</span> Register with an NGO, get verified, and start applying for jobs that match your skills and interests. Whether you're looking for part-time gigs, skilled work, or a new career, we make it easy to get started.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <a href="/ngo/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 text-xl">
            Register Now
          </a>
        </div>
        {/* ...existing code for registration and info sections... */}
      </div>
    </div>
  );
};

export default Home;
