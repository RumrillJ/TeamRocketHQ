import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(false); 

  const enter = () => {
    setSlide(true); 
    setTimeout(() => {
      setSlide(false); 
      navigate('/login'); 
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        className="pokeball-button"
        onClick={enter} 
      />
      {slide && (
        <div className="slide-overlay" style={{ animation: 'slide-left 0.3s' }}></div>
      )}
    </div>
  );
};