import React from 'react';

const RegistrationPending = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Registration Submitted Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for registering with our NGO. Your application is currently under review.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-700 text-left space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Our team will verify your documents (2-5 business days)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You'll receive an email notification once approved</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>After approval, you can login to access the job portal</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Need help?</strong><br />
            Contact us at: <a href="mailto:support@ngo.org" className="text-indigo-600 hover:underline">support@ngo.org</a>
          </p>
        </div>
        
        <a
          href="/ngo/status"
          className="block w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-3"
        >
          Check Application Status
        </a>
        
        <a
          href="/"
          className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default RegistrationPending;
