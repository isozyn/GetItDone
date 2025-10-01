import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

const NGORegistration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);
  const [isSkilled, setIsSkilled] = useState(null);

  const onSubmit = async (data) => {
    try {
      const registrationData = {
        ...data,
        isSkilled,
        status: 'pending', // Will be reviewed by NGO
      };
      
      const response = await axios.post('/ngo/register', registrationData);
      toast.success('Registration submitted successfully! You will be notified once verified.');
      navigate('/ngo/registration-pending');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          NGO Registration Portal
        </h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>1</div>
              <p className="text-xs mt-2">Personal Info</p>
            </div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>2</div>
              <p className="text-xs mt-2">Verification</p>
            </div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>3</div>
              <p className="text-xs mt-2">Skills</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  {...register('age', { required: 'Age is required', min: 18, max: 65 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full address"
                  rows="3"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Verification Documents */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Verification Documents</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number *</label>
                <input
                  type="text"
                  {...register('idNumber', { required: 'ID number is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your ID number"
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Document Reference *</label>
                <input
                  type="text"
                  {...register('idDocument', { required: 'ID document reference is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter document number or reference (e.g., passport number, driver's license)"
                />
                {errors.idDocument && <p className="text-red-500 text-sm mt-1">{errors.idDocument.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Provide your ID document reference number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proof of Address</label>
                <input
                  type="text"
                  {...register('proofOfAddress')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your current residential address"
                />
                <p className="text-xs text-gray-500 mt-1">Provide your full residential address for verification</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Skills Assessment */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Skills Assessment</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  Are you skilled in any specific field? This will help us match you with suitable job opportunities.
                </p>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setIsSkilled(true)}
                  className={`flex-1 py-4 rounded-lg border-2 transition ${
                    isSkilled === true
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold">Skilled Worker</p>
                    <p className="text-xs mt-1">I have specific skills & qualifications</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSkilled(false)}
                  className={`flex-1 py-4 rounded-lg border-2 transition ${
                    isSkilled === false
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold">Unskilled Worker</p>
                    <p className="text-xs mt-1">General labor & entry-level work</p>
                  </div>
                </button>
              </div>

              {/* Skilled Worker Form */}
              {isSkilled === true && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Skilled Worker Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills/Fields of Expertise *</label>
                    <textarea
                      {...register('skills', { required: isSkilled ? 'Please list your skills' : false })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Plumbing, Carpentry, Electrical work, Cooking, etc."
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
                    <input
                      type="number"
                      {...register('yearsExperience', { required: isSkilled ? 'Years of experience required' : false })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications/Certifications</label>
                    <textarea
                      {...register('qualifications')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="List any certificates or qualifications you have"
                      rows="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">References (Name & Contact) *</label>
                    <textarea
                      {...register('references', { required: isSkilled ? 'At least one reference required' : false })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Provide at least 2 references with contact details"
                      rows="3"
                    />
                  </div>
                </div>
              )}

              {/* Unskilled Worker Form */}
              {isSkilled === false && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Unskilled Worker Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Work Sectors *</label>
                    <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
                    <div className="space-y-2">
                      {['Domestic Work (Maid/Housekeeper)', 'Gardening', 'Laundry Services', 'Cleaning Services', 'Child Care', 'Elder Care', 'General Labor', 'Delivery/Courier', 'Other'].map((sector) => (
                        <label key={sector} className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('preferredSectors', { required: !isSkilled ? 'Select at least one sector' : false })}
                            value={sector}
                            className="mr-2"
                          />
                          <span className="text-sm">{sector}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      {...register('additionalInfo')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Any other relevant information (optional)"
                      rows="2"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSkilled === null}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Registration
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NGORegistration;
