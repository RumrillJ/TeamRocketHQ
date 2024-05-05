import { useEffect, useState } from 'react';
import { ReimbursementInterface } from '../../Interfaces/ReimbursementInterface';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RocketLogo from './rocketlogo.png';
import './Grunt.css'

export const AllReimbursementsForUser = () => {
  const navigate = useNavigate();
  const [reimb, setReimb] = useState<ReimbursementInterface[]>([]);

  useEffect(() => {
    getAllReimbsForUser();
  }, []);

  const getAllReimbsForUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reimbs/reimbForUser', { withCredentials: true });
      setReimb(response.data);
    } catch (error) {
      console.error('Error fetching reimbursements:', error);
    }
  };

  const createReimbursement = () => {
    navigate('/home/reimbursement/createReimbusement');
  };

  return (
    <div className="reimb-page"> 
      <div className="reimb-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1>Reimbursements</h1>
        <table className="reimb-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reimb.map((r) => (
              <tr key={r.reimbId}>
                <td>{r.reimbId}</td>
                <td>{r.description}</td>
                <td>{r.amount}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="create-reimbursement-button" onClick={createReimbursement}>
          Create Reimbursement
        </button>
      </div>
    </div>
  );
};
