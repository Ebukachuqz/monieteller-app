"use client";

import { exchangeTokenAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const MonoLink = ({
  user,
}: {
  user: { firstName: string; lastName: string; email: string };
}) => {
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  const openMonoWidget = React.useCallback(async () => {
    const MonoConnect = (await import("@mono.co/connect.js"!)).default;

    const monoInstance = new MonoConnect({
      key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
      onClose: () => console.log("Widget closed"),
      onLoad: () => setScriptLoaded(true),
      data: {
        customer: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      },
      onSuccess: async ({ code }: { code: string }) => {
        try {
          const res = await exchangeTokenAction(code);
          console.log("Bank account linked successfully:", res);
          router.push("/");
        } catch (err) {
          console.error("Linking failed:", err);
          // TODO show toast or UI feedback
        }
      },
    });

    monoInstance.setup();
    monoInstance.open();
  }, [user, router]);

  return (
    <Button className="monolink-primary" onClick={openMonoWidget}>
      Connect Your Bank
    </Button>
  );
};

export default MonoLink;
