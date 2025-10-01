import React, { useEffect, useState } from 'react';
import axios from 'axios';

const skillOptions = [
  'housekeeping', 'gardening', 'laundry', 'construction', 'office', 'retail', 'hospitality', 'other'
];

const ManageClasses = () => {
  const [users, setUsers] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(skillOptions[0]);
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
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Classes</h1>
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
          <label className="font-semibold text-lg">Select Class:</label>
          <select
            value={selectedSkill}
            onChange={e => setSelectedSkill(e.target.value)}
            className="px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {skillOptions.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Class Membership</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.isVerified ? 'Verified' : 'Pending'}</td>
                  <td className="px-4 py-2">
                    {user.skills && user.skills.includes(selectedSkill) ? (
                      <span className="text-green-600 font-semibold">Member</span>
                    ) : (
                      <span className="text-gray-400">Not a member</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.skills && user.skills.includes(selectedSkill) ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleRemoveClass(user._id, selectedSkill)}
                      >
                        Remove from class
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleAddClass(user._id, selectedSkill)}
                      >
                        Add to class
                      </button>
                    )}
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

export default ManageClasses;
