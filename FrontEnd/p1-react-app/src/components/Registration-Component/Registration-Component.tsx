import { useNavigate } from "react-router-dom"

export const RegistrationComponent: React.FC = () => {

    const navigate = useNavigate()

    const returnToLogin = () => {
        navigate('/login')
    }

    return(
        <div>
            <input type="text" name="username"/>
            <input type="password" name="password"/>
            <input type="text" name="firstName"/>
            <input type="text" name="lastName"/>
            <input type="email" name="email"/>
            <button>Register</button>
            <button onClick={returnToLogin}>Back to login</button>
        
        </div>

    )


}