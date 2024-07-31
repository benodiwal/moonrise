import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

const UserAvatar = () => {
    return (
        <Avatar className="w-8 h-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/116568350?s=400&u=32b485b980445073bb183be8333bba292fc86842&v=4" alt="avatar" className=""/>
            <AvatarFallback className="text-white font-medium">User</AvatarFallback>
        </Avatar>
        );
}

const UserMenu = () => {

  return (
     <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Hi, User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
     </DropdownMenu>
  )
}

export default UserMenu;
