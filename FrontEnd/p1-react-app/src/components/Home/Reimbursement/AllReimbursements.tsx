import { useEffect, useState } from 'react';
import { ReimbursementInterface } from '../../Interfaces/ReimbursementInterface';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RocketLogo from './rocketlogo.png';
import './Grunt.css'; // Use the correct CSS file

export const AllReimbursements: React.FC = () => {
  const navigate = useNavigate();

  const [reimb, setReimb] = useState<ReimbursementInterface[]>([]);
  const [status, setStatus] = useState('');
  const [reimbId, setReimbId] = useState(0);

  useEffect(() => {
    getAllReimbs();
  }, []);

  const getAllReimbs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reimbs/allReimbs', { withCredentials: true });
      setReimb(response.data);
    } catch (error) {
      console.error('Failed to fetch reimbursements:', error);
    }
  };

  const updateReimbStatus = async () => {
    try {
      const data = { reimbId, status };
      const response = await axios.put(
        `http://localhost:8080/reimbs/updateReimbStatus/${reimbId}`,
        data,
        { withCredentials: true }
      );
      console.log('Update successful:', response.data);
      getAllReimbs();
    } catch (error) {
      console.error('Failed to update reimbursement:', error);
    }
  };

  return (
    <div className="reimb-page">
      <div className="reimb-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1>All Reimbursements</h1>

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

        <select
          id="statusDropdown"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="APPROVED">APPROVED</option>
          <option value="DENIED">DENIED</option>
          <option value="PENDING">PENDING</option>
        </select>

        <input
          type="text"
          placeholder="Enter Reimbursement ID"
          onChange={(e) => setReimbId(Number(e.target.value))}
        />

        <button onClick={updateReimbStatus}>Update Reimbursement</button>
        <button onClick={() => navigate('/home/reimbursement/createReimbusement')}>
          Create Reimbursement
        </button>
      </div>
    </div>
  );
};
