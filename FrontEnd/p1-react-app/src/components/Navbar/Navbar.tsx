import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import profilePic from './teamrocketpfp.png'; 
import settingsIcon from './settings.png'; 

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
    alert("Successfully Signed Out");
  };

  const accessDenied = () => {
    alert("Access Denied");
    navigate('/home'); 
  };



  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Team Rocket HQ</span>
      </div>
      <div className="navbar-links">
        <a href="/home" className="navbar-link">Home</a>
        <a onClick={accessDenied} className="navbar-link">About</a>
        <a onClick={accessDenied} className="navbar-link">Contact HR</a>
      </div>
      <div className="navbar-signout">
        <img src={profilePic} alt="Profile" className="navbar-profile" />
        <img
          src={settingsIcon}
          alt="Settings"
          className="navbar-settings" 
          onClick={accessDenied} 
        />
        <button onClick={handleSignOut} className="signup-button">Sign Out</button>
      </div>
    </nav>
  );
};
