import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import RocketLogo from './rocketlogo.png'; 

export const LoginComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });

  const storeValues = (input : any) => {
    const { name, value } = input.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e : any) => {
    if (e.key === 'Enter') {
      login(); 
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', user, { withCredentials: true });
      navigate('/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  const register = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1 className="small-heading">Team Rocket Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={storeValues}
          onKeyPress={handleKeyPress} // Listen for "Enter" key
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={storeValues}
          onKeyPress={handleKeyPress} // Listen for "Enter" key
        />
        <button className="signin-button" onClick={login}>
          Sign In
        </button>
        <button className="join-now-button" onClick={register}>
          Not Apart Of Team Rocket? Join Now!
        </button>
      </div>
    </div>
  );
};
