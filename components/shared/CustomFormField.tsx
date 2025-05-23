import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formschema = authFormSchema("sign-up");

interface CustomFormField {
  control: Control<z.infer<typeof formschema>>;
  name: FieldPath<z.infer<typeof formschema>>;
  label: string;
  placeholder: string;
  type: string;
}

const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomFormField) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomFormField;
