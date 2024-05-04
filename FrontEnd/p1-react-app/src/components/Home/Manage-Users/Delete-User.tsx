import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { UserInterface } from "../../Interfaces/UserInterface"

export const DeleteUser: React.FC = () => {

    const [user, setInput] = useState<UserInterface[]>([])
    
    useEffect(() => {
        getAllUsers()
    }, [])

    const deleteUser = async(userId: any) => {
        try{
            const response = await axios.delete(`http://localhost:8080/users/${userId}`, {withCredentials:true})
            getAllUsers()
        }catch (error){
            console.error('Failed to find user', error)
        }
    }

    const mapUsers = () => {
        return user.map(user => (
            <div key={user.userId}>
                {user.username},
                {user.firstName}
                <button onClick={() => deleteUser(user.userId)}>Delete</button>
            </div>
        ));
    }

    const getAllUsers = async() => {

        const response = await axios.get('http://localhost:8080/users/allUsers', {withCredentials:true})
        const result = response.data
        setInput(response.data)
    }

    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        
        <div>
            {mapUsers()}
        </div>
    )

}