import { useLocation, useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import { useEffect, useState } from "react"
import axios from "axios"
//CaptainHome
export const AllReimbursements: React.FC<any> = () => {
    
    const navigate = useNavigate()
    
    const createReimbursement = () => {
        navigate("/home/reimbursement/createReimbusement")

    }
    const manageUsers = () => {
        navigate('/home/manage-users')

    }

    const [reimb, setReimb] = useState<ReimbursementInterface[]>([])
    const [status, setStatus] = useState('')
    const [reimbId, setReimbId] = useState(0)
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)

    const getReimbInput = (reimbInput: any) => {
        setReimbId(reimbInput.target.value)
    }
    
    useEffect(() => {
        getAllReimbs()
    }, [])
    
    const updateReimbStatus = async() => {
        
        try{
            const data = {
                reimbId: reimbId,
                status: status,
                description: '',
                amount: 0
            }
            const response = await axios.put(`http://localhost:8080/reimbs/updateReimbStatus/${reimbId}`, data,
            {withCredentials:true})
            getAllReimbs()
        }catch (error){
            console.error('Failed to find reimbursement', error)
        }
    }

   const mapReimbs = () => {
        return reimb.map(reimb => (
            <div key={reimb.reimbId}>
                {reimb.reimbId},
                {reimb.description},
                {reimb.amount},
                {reimb.status}
            </div>
        ));
    }
    const getAllReimbs = async() => {

        const response = await axios.get('http://localhost:8080/reimbs/allReimbs', {withCredentials:true})
        setReimb(response.data)
    }

    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        
        <div>
            {mapReimbs()}
            <select id="myDropdown" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select an option</option> {"PENDING"}
                <option value="APPROVED">APPROVED</option>
                <option value="DENIED">DENIED</option>
                <option value="PENDING">PENDING</option>
            </select>
            <input type="text" onChange={getReimbInput} placeholder="Enter Reimbursement Id"/>
            <button onClick={updateReimbStatus}>Update Reimbursement</button>
            <button onClick={() => {navigate('/home/reimbursement/createReimbusement')}}>Create Reimbursement</button>
        </div>
    )
}