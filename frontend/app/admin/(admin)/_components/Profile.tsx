import { useAuth } from "@/app/(client)/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
export const Profile = () => {
  const { signout } = useAuth();
  const router = useRouter();
  return (
    <div className="w-full py-3  flex justify-end bg-[#E4E4E7] h-fit">
      {/* <img src={"../logo.png"} className="w-9 h-9 rounded-full bg-white" /> */}
      {/* <AvatarFallback>AL</AvatarFallback> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="../logo.png" alt="@shadcn" className="bg-white" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex justify-center p-5">
          <Button
            className="rounded-3xl"
            variant={"outline"}
            onClick={() => {
              signout();
              router.push("/Login");
            }}
          >
            Log out
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
