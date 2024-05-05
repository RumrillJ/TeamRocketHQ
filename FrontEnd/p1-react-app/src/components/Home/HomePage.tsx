import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './homepage.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | undefined>();
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const delayEffect = setTimeout(() => {
      setDelayed(true); 
    }, 1000); 

    return () => clearTimeout(delayEffect); 
  }, []); 

  useEffect(() => {
    if (delayed) { 
      const fetchUserRole = async () => {
        try {
          const response = await axios.get('http://localhost:8080/users/userRole', { withCredentials: true });
          setRole(response.data);
        } catch (error) {
          console.error('Failed to fetch user role:', error);
          alert('Failed to fetch user role');
        }
      };

      fetchUserRole(); 
    }
  }, [delayed]); 

  useEffect(() => {
    if (role === 'Grunt') {
      navigate('/home/gruntHome');
    } else if (role === 'Captain') {
      navigate('/home/captainHome');
    }
  }, [role, navigate]); 

  return (
    <div className="home-page">
      <div className="pokeball-wrapper">
        <div className="pokeball-gif"></div>
      </div>
    </div>
  );
};
