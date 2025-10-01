import React, { useEffect, useState } from 'react';
import axios from 'axios';

const skillOptions = [
  'housekeeping', 'gardening', 'laundry', 'construction', 'office', 'retail', 'hospitality', 'other'
];

const AvailableClasses = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        setError('Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const availableClasses = user ? skillOptions.filter(skill => !(user.skills || []).includes(skill)) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Classes</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ul className="list-disc ml-6">
            {availableClasses.length > 0 ? (
              availableClasses.map(skill => (
                <li key={skill} className="text-indigo-700 font-medium mb-2">{skill}</li>
              ))
            ) : (
              <li className="text-gray-400">You have joined all available classes.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailableClasses;
