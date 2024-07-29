import Header from "@/components/shared/Header"
import { FC, ReactNode } from "react"

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full">
        <Header />
        { children }
    </div>
  )
}

export default AppLayout
