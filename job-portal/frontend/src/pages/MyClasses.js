import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Remove mockClassData import, will fetch from backend

const skillOptions = [
  'housekeeping', 'gardening', 'laundry', 'construction', 'office', 'retail', 'hospitality', 'other'
];

const MyClasses = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [classDetails, setClassDetails] = useState({});
  useEffect(() => {
    const fetchUserAndClasses = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
        // Fetch details for each class the user is enrolled in
        if (res.data.user.skills && res.data.user.skills.length > 0) {
          const details = {};
          for (const skill of res.data.user.skills) {
            try {
              const classRes = await axios.get(`/classes/${skill}/user/${res.data.user.id}`);
              details[skill] = classRes.data;
            } catch {
              details[skill] = { times: [], marks: 'N/A' };
            }
          }
          setClassDetails(details);
        }
      } catch (err) {
        setError('Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Classes</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map(skill => (
                <div key={skill} className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-indigo-700 mb-2">{skill.charAt(0).toUpperCase() + skill.slice(1)}</h2>
                  <div className="mb-2">
                    <span className="font-semibold">Times:</span>
                    <ul className="ml-4 list-disc">
                      {classDetails[skill]?.times && classDetails[skill].times.length > 0 ? (
                        classDetails[skill].times.map((t, idx) => (
                          <li key={idx} className="text-gray-700">{t}</li>
                        ))
                      ) : (
                        <li className="text-gray-400">No times available</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold">Marks:</span>
                    <span className="ml-2 text-green-700 font-bold">{classDetails[skill]?.marks ?? 'N/A'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 col-span-2">You are not enrolled in any classes.</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyClasses;
