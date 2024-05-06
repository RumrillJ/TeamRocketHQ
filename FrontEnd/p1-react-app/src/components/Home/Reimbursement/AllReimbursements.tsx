import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Navbar } from '../../Navbar/Navbar';
import RocketLogo from './rocketlogo.png';
import './Captain.css';
import { ReimbursementInterface } from '../../Interfaces/ReimbursementInterface';

// Status options for the dropdown
const statusOptions = [
  { value: 'APPROVED', label: 'APPROVED', color: 'green' },
  { value: 'PENDING', label: 'PENDING', color: '#FEBE10' },
  { value: 'DENIED', label: 'DENIED', color: 'red' },
];

// Custom styles for the Select component
const customStyles = {
  control: (base: any) => ({
    ...base,
    borderRadius: 5,
    border: '1px solid #ccc',
    padding: '10px',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? 'lightgray' : 'white',
    color: state.data.color,
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    color: state.data.color,
  }),
};

// Function to get the color for a status
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

export const AllReimbursements: React.FC = () => {
  const navigate = useNavigate();
  const [reimb, setReimb] = useState<ReimbursementInterface[]>([]);
  const [status, setStatus] = useState<string>('');
  const [reimbId, setReimbId] = useState<number>(0);
  const [filterPending, setFilterPending] = useState<boolean>(false);

  useEffect(() => {
    getAllReimbs();
  }, []);

  const getAllReimbs = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/reimbs/allReimbs',
        { withCredentials: true }
      );
      setReimb(response.data);
    } catch (error) {
      console.error('Failed to fetch reimbursements', error);
    }
  };

  const updateReimbStatus = async () => {
    try {
      const data = { reimbId, status };
      await axios.put(
        `http://localhost:8080/reimbs/updateReimbStatus/${reimbId}`,
        data,
        { withCredentials: true }
      );
      getAllReimbs();
    } catch (error) {
      console.error('Failed to update reimbursement', error);
    }
  };

  const getFilteredReimb = () => {
    if (filterPending) {
      return reimb.filter((r) => r.status?.toUpperCase() === 'PENDING');
    }
    return reimb;
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
        <h1 className="cool-heading">All Reimbursements</h1>

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

        <h1 className="small-heading">Update Reimbursements</h1>

        <Select
          options={statusOptions}
          styles={customStyles}
          value={statusOptions.find((opt) => opt.value === status)}
          onChange={(selectedOption) => setStatus(selectedOption?.value || '')}
        />

        <input
          type="text"
          placeholder="Enter Reimbursement ID"
          onChange={(e) => setReimbId(Number(e.target.value))}
        />

        <div className="button-container">
          <button
            className="create-reimbursement-button"
            onClick={updateReimbStatus}
          >
            Update Reimbursement
          </button>

          <button
            className="create-reimbursement-button"
            onClick={() => navigate('/home/reimbursement/createReimbusement')}
          >
            Create Reimbursement
          </button>

          <button
            className="create-reimbursement-button"
            onClick={() => navigate('/home/manage-users')}
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};
