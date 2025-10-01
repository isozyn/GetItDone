

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [picture, setPicture] = useState(user?.picture || '');
  const [description, setDescription] = useState(user?.description || '');

  // Dummy previous jobs data for demonstration
  const previousJobs = user?.previousJobs || [];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        <div className="text-center text-gray-600 text-xl">Loading profile...</div>
      </div>
    );
  }

  const handlePictureChange = () => {
    // TODO: Integrate with backend
    alert('Profile picture updated! (Demo only)');
  };

  const handleDescriptionChange = () => {
    // TODO: Integrate with backend
    alert('Description updated! (Demo only)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={picture || 'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName + '&background=indigo&color=fff'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-200 shadow"
          />
          <input
            type="text"
            value={picture}
            onChange={e => setPicture(e.target.value)}
            placeholder="Profile picture URL"
            className="mb-2 px-3 py-2 border rounded-lg w-48"
          />
          <button
            onClick={handlePictureChange}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Update Picture
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg mb-2"
            placeholder="Describe yourself, your skills, experience, etc."
          />
          <button
            onClick={handleDescriptionChange}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Update Description
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">ID Number:</span>
            <span className="text-gray-600">{user.idNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Experience Level:</span>
            <span className="text-gray-600 capitalize">{user.experienceLevel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Verified:</span>
            <span className={user.isVerified ? "text-green-600" : "text-red-600"}>{user.isVerified ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className={user.isAdmin ? "text-indigo-600 font-bold" : "text-gray-600"}>{user.isAdmin ? 'Admin' : 'User'}</span>
          </div>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-gray-700 mb-1 block">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No skills listed</span>
            )}
          </div>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-gray-700 mb-1 block">Previous Jobs:</span>
          <div className="flex flex-col gap-2">
            {previousJobs.length > 0 ? (
              previousJobs.map((job, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-3 text-sm">
                  <span className="font-bold text-indigo-700">{job.title}</span> <span className="text-gray-600">at {job.company}</span>
                  <div className="text-gray-500">{job.date}</div>
                </div>
              ))
            ) : (
              <span className="text-gray-400">No previous jobs listed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
