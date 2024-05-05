import { useState, useEffect } from "react";
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RocketLogo from "./rocketlogo.png";
import "./Reimbursement.css";
import { Navbar } from "../../Navbar/Navbar";

export const CreateReimbursement: React.FC = () => {
  const navigate = useNavigate();

  const [reimb, setReimb] = useState<ReimbursementInterface>({
    description: "",
    amount: 0,
    status: "PENDING",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({}); // Track validation errors

  useEffect(() => {
    validateForm(); // Validate form on initial render and when fields change
  }, [reimb]);

  const validateForm = () => {
    let valid = true;
    const newErrors: { description?: string; amount?: string } = {};

    if (!reimb.description || reimb.description.trim() === "") {
      newErrors.description = "Description cannot be empty";
      valid = false;
    }

    const amountValue = parseFloat(reimb.amount.toString());
    if (isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = "Amount must be a positive number";
      valid = false;
    }

    setErrors(newErrors); // Update errors
    setIsFormValid(valid); // Set form validity
  };

  const submitReimb = async () => {
    try {
      await axios.post("http://localhost:8080/reimbs/reimb", reimb, { withCredentials: true });
      navigate("/home");
    } catch (error) {
      console.error("Failed to submit reimbursement", error);
    }
  };

  const storeValues = (input: any) => {
    const { name, value } = input.target;
    setReimb((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="reimb-page">
       <Navbar />
      <div className="reimb-box">
        <img src={RocketLogo} alt="Rocket Logo" />
        <h1 className="cool-heading">Create Reimbursement</h1>

        <textarea
          name="description"
          rows={4}
          onChange={storeValues}
          placeholder="Description"
          className={errors.description ? "error-input" : ""} // Error styling if invalid
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p> // Display error message if invalid
        )}

        <input
          inputMode="numeric"
          type="text"
          name="amount"
          onChange={storeValues}
          placeholder="Amount"
          className={errors.amount ? "error-input" : ""} // Error styling if invalid
        />
        {errors.amount && (
          <p className="error-message">{errors.amount}</p> // Display error message if invalid
        )}

        <div className="button-group">
          <button
            className="create-reimbursement-button"
            onClick={submitReimb}
            disabled={!isFormValid} // Disable button if form is invalid
          >
            Submit Reimbursement
          </button>

          <button
            className="create-reimbursement-button"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
