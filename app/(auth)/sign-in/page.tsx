import React from "react";
import AuthFormComponent from "../_components/AuthFormComponent";

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthFormComponent type="sign-in" />
    </section>
  );
};

export default SignIn;
