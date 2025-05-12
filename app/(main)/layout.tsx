import Image from "next/image";
import MobileSideBar from "./_components/MobileSideBar";
import Sidebar from "./_components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.png" width={30} height={30} alt="logo" />
          <div>
            <MobileSideBar />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
