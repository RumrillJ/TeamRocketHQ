import { useLocation, useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface"
import { useEffect, useState } from "react"
import axios from "axios"

export const HomePage: React.FC<any> = () => {
    
    const navigate = useNavigate()

    const [role, setRole] = useState()
    
    const createReimbursement = () => {
        navigate("/home/reimbursement/createReimbusement")

    }
    const manageUsers = () => {
        navigate('/home/manage-users')

    }
    useEffect(() => {
        // Fetch user role when the component mounts
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/userRole', { withCredentials: true });
                setRole(response.data);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
                alert('Failed to fetch user role');
            }
        };

        fetchUserRole();
    }, []);

    useEffect(()=> {
        if(role == "Grunt"){
            (navigate("/home/gruntHome"))
        }else if(role == "Captain"){
            navigate("/home/captainHome")
        }
    }, [role, navigate]);
    

    return(
        
        <div>
        </div>
    )
}