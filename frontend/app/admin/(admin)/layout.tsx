import { HeaderAdmin } from "./_components/HeaderAdmin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <HeaderAdmin />
      {children}
    </div>
  );
}
