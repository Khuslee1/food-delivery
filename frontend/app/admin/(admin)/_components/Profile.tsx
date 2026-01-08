import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Profile = () => {
  return (
    <div className="w-full py-3  flex justify-end bg-[#E4E4E7] h-fit">
      {/* <img src={"../logo.png"} className="w-9 h-9 rounded-full bg-white" /> */}
      <Avatar>
        <AvatarImage src="../logo.png" alt="@shadcn" className="bg-white" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </div>
  );
};
