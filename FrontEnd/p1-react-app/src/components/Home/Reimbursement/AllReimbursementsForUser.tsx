import { useEffect, useState } from 'react';
import { ReimbursementInterface } from '../../Interfaces/ReimbursementInterface';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RocketLogo from './rocketlogo.png';
import './Grunt.css';
import { Navbar } from '../../Navbar/Navbar';

const getStatusColor = (status: string | undefined): string => {
  if (!status) {
    return 'black'; 
  }

  switch (status.toUpperCase()) {
    case 'APPROVED':
      return 'green';
    case 'PENDING':
      return '#FEBE10';
    case 'DENIED':
      return 'red';
    default:
      return 'black';
  }
};

export const AllReimbursementsForUser = () => {
  const navigate = useNavigate();
  const [reimb, setReimb] = useState<ReimbursementInterface[]>([]);
  const [filterPending, setFilterPending] = useState<boolean>(false); 

  useEffect(() => {
    getAllReimbsForUser();
  }, []);

  const getAllReimbsForUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/reimbs/reimbForUser',
        { withCredentials: true }
      );
      setReimb(response.data);
    } catch (error) {
      console.error('Error fetching reimbursements:', error);
    }
  };

  const createReimbursement = () => {
    navigate('/home/reimbursement/createReimbusement');
  };

  const getFilteredReimb = () => {
    if (filterPending) {
      return reimb.filter((r) => r.status?.toUpperCase() === 'PENDING'); 
    }
    return reimb; // Show all
  };

  const filterButtonStyle = {
    backgroundColor: filterPending ? 'green' : '#FEBE10', 
    border: '1px solid black',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', 
  };

  return (
    <div className="reimb-page">
      <Navbar />
      <div className="reimb-box">
        <img src={RocketLogo} alt="Rocket Logo" />

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
            {getFilteredReimb().map((r) => (
              <tr key={r.reimbId}>
                <td>{r.reimbId}</td>
                <td>{r.description}</td>
                <td>{r.amount}</td>
                <td style={{ color: getStatusColor(r.status) }}>{r.status || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="filter-container"> 
          <button
            style={filterButtonStyle}
            onClick={() => setFilterPending(!filterPending)} 
          >
            {filterPending ? 'Show All Reimbursements' : 'Show Pending Reimbursements'}
          </button>
        </div>

        <button
          className="create-reimbursement-button"
          onClick={createReimbursement}
        >
          Create Reimbursement
        </button>
      </div>
    </div>
  );
};
