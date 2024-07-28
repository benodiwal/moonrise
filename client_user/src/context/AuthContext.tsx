import { FC, ReactNode } from "react"

const AuthContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
        {children}   
    </div>
  )
}

export default AuthContext
