import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [searching, setSearching] = useState(false);

  const checkStatus = async (userEmail) => {
    setLoading(true);
    try {
      const response = await axios.get(`/ngo/status/${userEmail}`);
      setStatus(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('No registration found with this email');
      } else {
        toast.error('Failed to fetch status');
      }
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (email) {
      setSearching(true);
      checkStatus(email);
    }
  };

  const getCompletionPercentage = () => {
    if (!status?.completionStatus) return 0;
    const completed = Object.values(status.completionStatus).filter(Boolean).length;
    const total = Object.keys(status.completionStatus).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Check Your Application Status
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Check Status
              </button>
            </div>
          </form>

          {/* Loading State */}
          {loading && searching && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Checking your status...</p>
            </div>
          )}

          {/* Status Display */}
          {!loading && status && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="text-center">
                <span className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
                  status.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  status.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {status.status === 'pending' && '⏳ Application Pending Review'}
                  {status.status === 'approved' && '✅ Application Approved!'}
                  {status.status === 'rejected' && '❌ Application Rejected'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Application Completion</span>
                  <span className="text-sm font-bold text-indigo-600">{getCompletionPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Checklist</h3>
                <div className="space-y-3">
                  {Object.entries(status.completionStatus).map(([key, completed]) => (
                    <div key={key} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {completed && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`capitalize ${completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Message */}
              {status.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">What's Next?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                    <li>Our team is currently reviewing your application</li>
                    <li>This typically takes 2-5 business days</li>
                    <li>You'll receive an email notification once reviewed</li>
                    <li>Make sure to check your spam folder</li>
                  </ul>
                </div>
              )}

              {status.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Congratulations! Your Application is Approved!
                  </h4>
                  <p className="text-sm text-green-700 mb-4">
                    Welcome to our job portal! You're one step away from accessing thousands of job opportunities.
                  </p>
                  
                  {status.passwordSetupToken && (
                    <div className="bg-white rounded-lg p-4 mb-4 border border-green-300">
                      <h5 className="font-semibold text-gray-900 mb-2">🔑 Set Up Your Account</h5>
                      <p className="text-sm text-gray-600 mb-3">
                        Click the button below to create your password and activate your account.
                      </p>
                      <a
                        href={`/setup-password/${status.passwordSetupToken}`}
                        className="inline-block w-full text-center px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition shadow-md"
                      >
                        Create Password & Access Job Portal
                      </a>
                      <p className="text-xs text-gray-500 mt-2">
                        ⏰ This link is valid for 24 hours
                      </p>
                    </div>
                  )}
                  
                  {!status.passwordSetupToken && (
                    <div className="bg-white rounded-lg p-4 border border-green-300">
                      <p className="text-sm text-gray-700 mb-3">
                        You can now login to the job portal using your credentials.
                      </p>
                      <a
                        href="/login"
                        className="inline-block w-full text-center px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition shadow-md"
                      >
                        Login to Job Portal
                      </a>
                    </div>
                  )}

                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      <strong>What's Next?</strong>
                    </p>
                    <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                      <li>Set up your password (if not done yet)</li>
                      <li>Complete your profile with work experience</li>
                      <li>Browse and apply for jobs that match your skills</li>
                      <li>Start your journey to employment!</li>
                    </ul>
                  </div>
                </div>
              )}

              {status.status === 'rejected' && status.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Application Rejected</h4>
                  <p className="text-sm text-red-700 mb-3">
                    <strong>Reason:</strong> {status.rejectionReason}
                  </p>
                  <p className="text-sm text-red-600">
                    You may reapply after addressing the issues mentioned above.
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Submitted:</span>{' '}
                    {new Date(status.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {status.reviewedAt && (
                    <div>
                      <span className="font-medium">Reviewed:</span>{' '}
                      {new Date(status.reviewedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Need help? Contact us at <a href="mailto:support@ngo.org" className="text-indigo-600 hover:underline">support@ngo.org</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
