"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomFormField from "@/components/shared/CustomFormField";
import React from "react";
import { Loader } from "lucide-react";

export function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {type === "sign-up" && (
          <>
            <div className="flex gap-4">
              <CustomFormField
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                type="text"
              />
              <CustomFormField
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your first name"
                type="text"
              />
            </div>
            <div className="flex gap-4">
              <CustomFormField
                control={form.control}
                name="address1"
                label="Address"
                placeholder="Enter your specific address"
                type="text"
              />
              <CustomFormField
                control={form.control}
                name="state"
                label="State"
                placeholder="Enter your State"
                type="text"
              />
            </div>
            <div className="flex gap-4">
              <CustomFormField
                control={form.control}
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                type="text"
              />
              <CustomFormField
                control={form.control}
                name="nin"
                label="NIN"
                placeholder="National Identitification Number (NIN)"
                type="text"
              />
            </div>
          </>
        )}
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email Address"
          type="email"
        />
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="password Address"
          type="password"
        />
        <div className="flex flex-col gap-1">
          <Button type="submit" disabled={isLoading} className="form-btn">
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                &nbsp;Loading...
              </>
            ) : type === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;
