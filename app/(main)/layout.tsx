import Image from "next/image";
import MobileSideBar from "./_components/MobileSideBar";
import Sidebar from "./_components/Sidebar";
import { getLoggedInUserAction } from "@/actions/user.actions";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUserAction();
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.png" width={30} height={30} alt="logo" />
          <div>
            <MobileSideBar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
