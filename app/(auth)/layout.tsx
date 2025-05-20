import Image from "next/image";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/moniteller-authbanner.png"
            alt="Auth image"
            width={600}
            height={600}
            className="rounded-l-xl object-cover border-4 border-blue-400"
          />
        </div>
      </div>
    </main>
  );
}
