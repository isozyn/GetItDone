import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchStats();
    fetchRegistrations();
  }, [filter]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/ngo/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/ngo/registrations?status=${filter}`);
      setRegistrations(response.data);
    } catch (error) {
      toast.error('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/ngo/registrations/${id}/approve`);
      toast.success('Registration approved! User account created.');
      fetchRegistrations();
      fetchStats();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to approve registration');
    }
  };

  const handleReject = async (id) => {
    if (!rejectionReason) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    
    try {
      await axios.put(`/ngo/registrations/${id}/reject`, { reason: rejectionReason });
      toast.success('Registration rejected');
      fetchRegistrations();
      fetchStats();
      setShowModal(false);
      setRejectionReason('');
    } catch (error) {
      toast.error('Failed to reject registration');
    }
  };

  const openModal = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage NGO registrations and user applications</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">Total</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-yellow-700">Pending</div>
              <div className="mt-2 text-3xl font-bold text-yellow-900">{stats.pending}</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-green-700">Approved</div>
              <div className="mt-2 text-3xl font-bold text-green-900">{stats.approved}</div>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-red-700">Rejected</div>
              <div className="mt-2 text-3xl font-bold text-red-900">{stats.rejected}</div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-blue-700">Skilled</div>
              <div className="mt-2 text-3xl font-bold text-blue-900">{stats.skilled}</div>
            </div>
            <div className="bg-purple-50 rounded-lg shadow p-6">
              <div className="text-sm font-medium text-purple-700">Unskilled</div>
              <div className="mt-2 text-3xl font-bold text-purple-900">{stats.unskilled}</div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['pending', 'approved', 'rejected', 'all'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status === 'all' ? '' : status)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                    filter === (status === 'all' ? '' : status)
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Registrations List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {registrations.length} Registration{registrations.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : registrations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No registrations found</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {registrations.map((reg) => (
                <div key={reg._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{reg.fullName}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {reg.status}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reg.isSkilled ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {reg.isSkilled ? 'Skilled' : 'Unskilled'}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Email:</span> {reg.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {reg.phone}
                        </div>
                        <div>
                          <span className="font-medium">ID Number:</span> {reg.idNumber}
                        </div>
                        <div>
                          <span className="font-medium">Age:</span> {reg.age}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Address:</span> {reg.address}
                        </div>
                        {reg.isSkilled && reg.skills && (
                          <div className="col-span-2">
                            <span className="font-medium">Skills:</span> {reg.skills}
                          </div>
                        )}
                        {!reg.isSkilled && reg.preferredSectors && reg.preferredSectors.length > 0 && (
                          <div className="col-span-2">
                            <span className="font-medium">Preferred Sectors:</span> {reg.preferredSectors.join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        Submitted: {new Date(reg.createdAt).toLocaleDateString()}
                        {reg.reviewedAt && ` • Reviewed: ${new Date(reg.reviewedAt).toLocaleDateString()}`}
                      </div>
                      
                      {reg.rejectionReason && (
                        <div className="mt-2 p-3 bg-red-50 rounded-md">
                          <p className="text-sm text-red-800">
                            <span className="font-medium">Rejection Reason:</span> {reg.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {reg.status === 'pending' && (
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => handleApprove(reg._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(reg)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {showModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Reject Registration: {selectedRegistration.fullName}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder="Please provide a reason..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedRegistration._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
