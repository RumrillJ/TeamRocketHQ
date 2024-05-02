import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginComponent: React.FC = () => {
  const navigate = useNavigate();

  const login = async () => {
    navigate("/home");
  };

  const register = async () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="flex flex-col space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-center text-2xl font-semibold">Login</h2>
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Sign In
        </button>
        
        <button
          onClick={register}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ease-in-out duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};