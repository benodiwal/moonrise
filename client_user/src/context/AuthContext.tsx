import { FC, ReactNode } from "react"
import Login from "../components/Login"
import { useGetUser } from "../state/user"

const AuthContext: FC<{ children: ReactNode }> = ({ children }) => {
    const { isLoading, isError, data, error } = useGetUser()
    
    if (isLoading) return <>Loading..</>
    
    if (isError && (!error.response || error.response.status !== 401))
    return <>OOPS...</>
    
    if (!isLoading && !data) return <Login />
    
    return <>{children}</>
}

export default AuthContext;
