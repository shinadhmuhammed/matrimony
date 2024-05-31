import React from 'react';


function SignupModal({ isOpen, onClose, signupData, handleChange, handleSubmit, handleSwitchToLogin }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-80 mt-5  ">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &#x2715;
        </button>
        <div className="flex flex-col items-center mb-4">
          <img 
            src="https://img2.shaadi.com/assests/2016/images/home-page-layer-logo.png" 
            alt="Sign Up" 
            className="w-10 h-10 mb-4" 
          />
          <h2 className="text-2xl font-semibold">Create Your Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={signupData.username}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={signupData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={signupData.gender}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="religion" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              value={signupData.religion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Select</option>
              <option value="muslim">Muslim</option>
              <option value="hindu">Hindu</option>
              <option value="christian">Christian</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          
          <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Already a member?{' '}
            <button onClick={handleSwitchToLogin} className="text-blue-600 font-semibold focus:outline-none">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
