import axios from "axios"
import { error } from "console"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ManageUsers: React.FC = () => {

    const navigate = useNavigate()

    const getAllUsers = async() => {

        const response = await axios.get('http://localhost:8080/users/allUsers')
        const result = response.data
        navigate("/home/get-all-users", { state: { data: result } })
    //catch{console.error("error getting all users", error)
    }
    const deleteUser = () => {
        navigate('/home/manage-users/delete-user')
    }

    return(
        <div>
            <button onClick={getAllUsers}>Get All Users</button>
            <button onClick={deleteUser}>Delete Users</button>
        </div>

    )

}