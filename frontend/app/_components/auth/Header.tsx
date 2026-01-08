type HeaderProps = {
  h1T: string;
  pT: string;
};
export const Header = ({ h1T, pT }: HeaderProps) => {
  return (
    <div className="w-full flex gap-1 flex-col">
      <h1 className="font-semibold text-[24px] ">{h1T}</h1>
      <p className="text-4 text-[#71717A]">{pT}</p>
    </div>
  );
};
