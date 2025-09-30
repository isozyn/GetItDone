import React from 'react';

const ChangePassword = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 className="text-2xl font-bold mb-4">Change Password</h2>
    <form className="w-full max-w-xs">
      <input type="password" placeholder="Current Password" className="mb-2 p-2 w-full border rounded" />
      <input type="password" placeholder="New Password" className="mb-4 p-2 w-full border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Change Password</button>
    </form>
  </div>
);

export default ChangePassword;
