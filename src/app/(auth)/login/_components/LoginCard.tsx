import Image from "next/image";

import { GoogleSignInButton } from "./GoogleSignInButton";
import { OrDivider } from "./OrDivider";
import { LoginForm } from "./LoginForm";
import { buddyAsset } from "@/features/buddyscript/assets";

export function LoginCard() {
  return (
    <div className="lg:col-span-4">
      <div className="bg-buddy-surface rounded-md p-10 shadow-sm sm:p-12">
        <div className="mb-7 flex justify-center">
          <Image
            src={buddyAsset("Logo")}
            alt="Buddy Script"
            width={161}
            height={50}
            style={{ width: "auto", height: "auto", maxWidth: "161px" }}
            priority
            unoptimized
          />
        </div>

        {/* Heading */}
        <p className="text-buddy-text mb-2 text-center text-base leading-snug">Welcome back</p>
        <h1 className="text-buddy-heading mb-12 text-center text-[28px] leading-tight font-medium">
          Login to your account
        </h1>

        {/* Google sign-in */}
        <GoogleSignInButton />

        {/* Divider */}
        <OrDivider />

        {/* Email/password form */}
        <LoginForm />
      </div>
    </div>
  );
}
