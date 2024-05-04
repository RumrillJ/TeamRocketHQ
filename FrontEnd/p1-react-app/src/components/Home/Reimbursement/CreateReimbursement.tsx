import { useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const CreateReimbursement: React.FC = () => {

    const navigate = useNavigate()

    const [reimb, setReimb] = useState<ReimbursementInterface>({
        description: "",
        amount: 0,
        status: "PENDING"
    })

    const submitReimb = async () => {
        const response = await axios.post(`http://localhost:8080/reimbs/reimb`, reimb, {withCredentials:true})
        alert(response.data)

    }

    const storeValues = (input: any) => {
        if(input.target.name === "description"){
            setReimb((reimb) => ({...reimb, description: input.target.value}))
        }else if((input.target.name === "amount")){
            setReimb((reimb) => ({...reimb, amount: input.target.value}))
        }
    }

    return(
        <div>
            <input type="text" name="description" onChange={storeValues} placeholder="description"/>
            <input inputMode="numeric" type="text" name="amount" onChange={storeValues} placeholder="amount"/>
            <button onClick={submitReimb}>Submit Reimbursement</button>
            <button onClick={() => {navigate("/home/reimbursement")}}>Cancel</button>
        </div>
    )

}