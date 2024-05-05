import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import RocketLogo from './rocketlogo.png';
import './Registration.css';

//registration component
// test
export const RegistrationComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const storeValues = (input : any) => {
    const { name, value } = input.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e : any) => {
    if (e.key === 'Enter') {
      register(); 
    }
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/register', user);
      navigate('/login');
      alert ('Registration successful! Please login to continue.')
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const returnToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1 className="small-heading">Join Team Rocket Now!</h1>
        <input
          type="text"
          name="username"
          onChange={storeValues}
          placeholder="Username"
          onKeyPress={handleKeyPress} 
        />
        <input
          type="password"
          name="password"
          onChange={storeValues}
          placeholder="Password"
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          name="firstName"
          onChange={storeValues}
          placeholder="First Name"
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          name="lastName"
          onChange={storeValues}
          placeholder="Last Name"
          onKeyPress={handleKeyPress}
        />
        <input
          type="email"
          name="email"
          onChange={storeValues}
          placeholder="Email"
          onKeyPress={handleKeyPress}
        />
        <button className="signin-button" onClick={register}>
          Register
        </button>
        <button className="join-now-button" onClick={returnToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
};
