import { useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"

export const Reimbursement: React.FC = () => {

    const navigate = useNavigate()

    return(
        <div>
            <input type="text" name="description"/>
            <input type="text" name="amount"/>
            <button onClick={() => navigate("/home")}>Back</button>
            <button onClick={() => navigate("/home/reimbursement/createReimbursement")}>Create Reimbursement</button>

        </div>
    )

}