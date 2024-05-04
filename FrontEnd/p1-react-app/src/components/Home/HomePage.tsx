import { useLocation, useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface"
import { useEffect, useState } from "react"
import axios from "axios"

export const HomePage: React.FC<any> = () => {
    
    const navigate = useNavigate()
    
    const createReimbursement = () => {
        navigate("/home/reimbursement/createReimbusement")

    }
    const manageUsers = () => {
        navigate('/home/manage-users')

    }
    const [reimb, setReimb] = useState<ReimbursementInterface[]>([])
    
    useEffect(() => {
        getAllReimbs()
    }, [])
    
    const updateReimbStatus = async(reimbursementId: any) => {
        try{
            const response = await axios.delete(`http://localhost:8080/`, {withCredentials:true})
            getAllReimbs()
        }catch (error){
            console.error('Failed to find reimbursement', error)
        }
    }

    const mapReimbs = () => {
        return reimb.map(reimb => (
            <div key={reimb.reimbursementId}>
                {reimb.description},
                {reimb.amount}
                {/*<select id="myDropdown" value={} onChange={}>
                    <option value="">Select an option</option> {"PENDING"}
                    <option value="APPROVED">APPROVED</option>
                    <option value="DENIED">DENIED</option>
                    <option value="PENDING">PENDING</option>
        </select>*/}
                <button onClick={() => updateReimbStatus(reimb.reimbursementId)}>Update</button>
            </div>
        ));
    }

    const getAllReimbs = async() => {

        const response = await axios.get('http://localhost:8080/reimbs/allReimbs', {withCredentials:true})
        const result = response.data
        setReimb(response.data)
    }

    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        
        <div>
            {mapReimbs()}
        </div>
    )
}