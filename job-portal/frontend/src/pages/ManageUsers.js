import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/admin/users');
        setUsers(res.data.users || []);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Skill options (should match backend Job model categories)
  const skillOptions = [
    'housekeeping', 'gardening', 'laundry', 'construction', 'office', 'retail', 'hospitality', 'other'
  ];

  // Add user to class
  const handleAddClass = async (userId, skill) => {
    try {
      await axios.post(`/admin/users/${userId}/add-class`, { skill });
      setUsers(users => users.map(u => u._id === userId ? { ...u, skills: [...(u.skills || []), skill] } : u));
    } catch (err) {
      alert('Failed to add user to class');
    }
  };

  // Remove user from class
  const handleRemoveClass = async (userId, skill) => {
    try {
      await axios.post(`/admin/users/${userId}/remove-class`, { skill });
      setUsers(users => users.map(u => u._id === userId ? { ...u, skills: (u.skills || []).filter(s => s !== skill) } : u));
    } catch (err) {
      alert('Failed to remove user from class');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Users</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400">No users found.</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
                <th className="px-4 py-2 text-left">Classes</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.isVerified ? 'Verified' : 'Pending'}</td>
                  <td className="px-4 py-2">
                    {/* Add accept/decline/remove actions here */}
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Accept</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">Decline</button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded">Remove</button>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-2">
                      <div>
                        <span className="font-semibold">Current:</span>
                        {(user.skills && user.skills.length > 0) ? user.skills.join(', ') : 'None'}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {skillOptions.map(skill => (
                          <button
                            key={skill}
                            className={`px-2 py-1 rounded text-xs ${user.skills && user.skills.includes(skill) ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}
                            onClick={() => user.skills && user.skills.includes(skill)
                              ? handleRemoveClass(user._id, skill)
                              : handleAddClass(user._id, skill)}
                          >
                            {user.skills && user.skills.includes(skill) ? `Remove ${skill}` : `Add ${skill}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
