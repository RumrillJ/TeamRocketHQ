import { useNavigate } from "react-router-dom"

export const HomePage: React.FC<any> = () => {
    
    const navigate = useNavigate()
    
    const createReimbursement = () => {
        navigate("/reimbursement")

    }
    const manageUsers = () => {
        navigate('/home/manage-users')

    }
    return(

        <div>
            <button onClick={createReimbursement}>Create Reimbursement</button>
            <button onClick={manageUsers}>Manage Users</button>
        </div>
    )


}