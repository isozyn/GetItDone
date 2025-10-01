import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'housekeeping', label: 'Housekeeping' },
    { value: 'gardening', label: 'Gardening' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'construction', label: 'Construction' },
    { value: 'office', label: 'Office Work' },
    { value: 'retail', label: 'Retail' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = '/jobs/all';
      if (selectedCategory !== 'all') {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Available Jobs
        </h1>
        <p className="mt-2 text-gray-600">
          Browse all available job opportunities. Register with our NGO to apply!
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {jobCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No jobs found for this category
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {job.description}
                    </p>
                    <div className="mt-3 flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.category}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.skillLevel} skill level
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {job.jobType}
                      </span>
                    </div>
                    {job.salary && (
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        Salary: {job.salary}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    <button 
                      onClick={() => toast.error('Please register with our NGO to apply for jobs')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
