import UserMenu from "../user/UserMenu"
import Logo from "./Logo"

const Header = () => {

  return (
    <div className="w-full h-[55px] min-h-[55px] border-b-[1px] border-black py-2 px-10 flex justify-between items-center">
        <Logo />
        <UserMenu />   
    </div>
  )
}

export default Header
