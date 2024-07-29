import { useLogout } from "@/state/auth"
import Logo from "./Logo"
import { Button } from "../ui/button";

const Header = () => {

    const logout = useLogout();
    const logout_fn = async () => {
        await logout.mutateAsync();
    }

  return (
    <div className="w-full h-[55px] min-h-[55px] border-b-[1px] border-black py-2 px-10 flex justify-between items-center">
        <Logo />
        <Button onClick={() => logout_fn()}>
            Logout
        </Button>
    </div>
  )
}

export default Header
