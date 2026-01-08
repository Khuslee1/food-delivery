import { Pagi } from "./_components/Pagi";
import { Profile } from "./_components/Profile";
import { TableComp } from "./_components/TableComp";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10 bg-[#E4E4E7] px-7">
      <Profile />
      <TableComp />
      <Pagi />
    </div>
  );
}
