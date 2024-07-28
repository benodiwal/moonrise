import { FC, ReactNode } from "react"

const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
        { children } 
    </div>
  )
}

export default BaseLayout
