import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
//GruntHome
export const AllReimbursementsForUser: React.FC<any> = () => {
    const navigate = useNavigate()
    
    const createReimbursement = () => {
        navigate("/home/reimbursement/createReimbusement")

    }
    const manageUsers = () => {
        navigate('/home/manage-users')

    }
    const [reimb, setReimb] = useState<ReimbursementInterface[]>([])
    
    useEffect(() => {
        getAllReimbsForUser()
    }, [])

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

    const getAllReimbsForUser = async() => {
        const response = await axios.get(`http://localhost:8080/reimbs/reimbForUser`, {withCredentials:true})
        const result = response.data
        setReimb(response.data)
    }

    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        
        <div>
            {mapReimbs()}
            <button onClick={() => {navigate('/home/reimbursement/createReimbusement')}}>Create Reimbursement</button>
        </div>
    )
}