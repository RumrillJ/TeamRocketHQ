import { useNavigate } from "react-router-dom"

export const Reimbursement: React.FC = () => {

    const navigate = useNavigate()

    const backToHome = () => {

        navigate('/home')

    }

    return(
        <div>
            <input type="text" name="description"/>
            <input type="text" name="amount"/>
            <button>Submit</button>
            <button onClick={backToHome}>Back</button>

        </div>
    )



}