import axios from "axios"
import { error } from "console"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ManageUsers: React.FC = () => {

    const navigate = useNavigate()

    const deleteUser = () => {
        navigate('/home/manage-users/delete-user')
    }

    return(
        <div>
            <button onClick={deleteUser}>Delete Users</button>
        </div>

    )

}