"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "./AuthForm";
import MonoLink from "./MonoLink";

const AuthFormComponent = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = React.useState(null);
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.png"
            width={34}
            height={34}
            alt="MonieTeller logo"
          />
          <h1 className="monieteller-logo text-26">
            <span className="monie">Monie</span>
            <span className="teller">Teller</span>
          </h1>
        </Link>

        <div className="flex flex-col gap-1">
          <h1 className="text-24 md:text-32 font-bold">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-14 md:text-16 text-gray-500">
            {user
              ? "Link your account to MonieTeller to get started."
              : type === "sign-in"
              ? "Welcome back! Please enter your details."
              : "Create an account to get started."}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <MonoLink user={user} />
        </div>
      ) : (
        <>
          <AuthForm type={type} setUser={setUser} />
          <footer className="flex justify-center gap-1">
            <p className="text-14 text-gray-500">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthFormComponent;
