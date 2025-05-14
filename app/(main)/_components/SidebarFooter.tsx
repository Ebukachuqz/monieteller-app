import { signOutAction } from "@/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarFooter = ({ user, type = "desktop" }: SideBarFooterProps) => {
  const router = useRouter();
  const handleSignOut = async () => {
    const signedOut = await signOutAction();
    if (signedOut) router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div
        className={
          type === "desktop" ? "footer_name" : "footer_name-mobile p-5"
        }
      >
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div
        className={type === "desktop" ? "footer_email" : "footer_email-mobile"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleSignOut}>
        <Image src={"/icons/logout.svg"} alt="logout" fill />
      </div>
    </footer>
  );
};

export default SidebarFooter;
