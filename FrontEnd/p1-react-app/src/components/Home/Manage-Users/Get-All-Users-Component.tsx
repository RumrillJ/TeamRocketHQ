import { useLocation } from "react-router-dom"

export const GetAllUsersComponent: React.FC = () => {
    const location = useLocation()
    const {data} = location.state || {}
    console.log(data) 


    return(
        <div>
            <h1>User List</h1>
            {data ? (
            <pre>{JSON.stringify(data, null, 1)}</pre>
            ) : (
            <>error</> 
            )}
           
        </div>
    )

}