import axios from "axios"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export const DeleteUser: React.FC = () => {

    //let userInput:any = 0
    const [userInput, setInput] = useState()

    const deleteUser = async() => {
        const response = await axios.delete('http://localhost/users/2')// + userInput2)

    }

    const getUserInput = (input:any) => {
        //userInput = input.target.value

    }

    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        <div>
            {
            
            /*
            <h1>User List</h1>
            {data ? (
            <pre>{JSON.stringify(data, null, 1)}</pre>
            ) : (
            <>error</> 
            )}*/}
            {/*<input type="number" value={userInput} onChange = {(e) => setInput(e.target.value)}  name="userInput"></input>*/}
            <button onClick={deleteUser}>Delete User</button>
        
        </div>
    )

}