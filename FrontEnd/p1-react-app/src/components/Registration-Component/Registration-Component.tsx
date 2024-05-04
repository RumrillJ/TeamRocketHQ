import { useNavigate } from "react-router-dom"
import { UserInterface } from "../Interfaces/UserInterface"
import { useState } from "react"
import axios from "axios"

export const RegistrationComponent: React.FC = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState<UserInterface>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    const storeValues = (input: any) => {
        if(input.target.name === "username"){
        setUser((user) => ({...user, username: input.target.value}))
        }else if((input.target.name === "password")){
        setUser((user) => ({...user, password: input.target.value}))
        }else if((input.target.name === "firstName")){
        setUser((user) => ({...user, firstName: input.target.value}))
        }else if((input.target.name === "lastName")){
        setUser((user) => ({...user, lastName: input.target.value}))
        }else if((input.target.name === "email")){
        setUser((user) => ({...user, email: input.target.value}))
        }
    }

    const register = async () => {
        const response = await axios.post("http://localhost:8080/users/register", user)
        navigate("/login")
    }

    const returnToLogin = () => {
        navigate('/login')
    }

    return(
        <div>
            <input type="text" name="username" onChange={storeValues} placeholder="Username"/>
            <input type="password" name="password" onChange={storeValues} placeholder="password"/>
            <input type="text" name="firstName" onChange={storeValues} placeholder="firstname"/>
            <input type="text" name="lastName" onChange={storeValues} placeholder="lastname"/>
            <input type="email" name="email" onChange={storeValues} placeholder="email"/>
            <button onClick={register}>Register</button>
            <button onClick={returnToLogin}>Back to login</button>
        
        </div>

    )


}