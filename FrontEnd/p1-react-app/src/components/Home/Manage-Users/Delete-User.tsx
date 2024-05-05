import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../Interfaces/UserInterface';
import RocketLogo from './rocketlogo.png';
import { Navbar } from '../../Navbar/Navbar';

export const DeleteUser: React.FC = () => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/allUsers', { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const deleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) { 
      try {
        await axios.delete(`http://localhost:8080/users/${userId}`, { withCredentials: true });
        getAllUsers(); 
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div className="reimb-page">
      <Navbar/>
      <div className="reimb-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1 className="cool-heading">Delete Users</h1>

        <table className="reimb-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userId = user.userId || 0; 
              return (
                <tr key={userId}>
                  <td>{userId}</td>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className="create-reimbursement-button"
                      onClick={() => deleteUser(userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          className="create-reimbursement-button"
          style={{ marginTop: '20px' }} 
          onClick={() => navigate('/home')}
        >
          Back
        </button>
      </div>
    </div>
  );
};
