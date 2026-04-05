import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { OrDivider } from "@/app/(buddy)/login/_components/OrDivider";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { RegistrationForm } from "./RegistrationForm";

export function RegistrationCard() {
  return (
    <div className="lg:col-span-4">
      <div className="bg-buddy-surface rounded-md p-10 shadow-sm sm:p-12">
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          <Image
            src={Logo}
            alt="Buddy Script"
            width={161}
            height={50}
            style={{ width: "auto", height: "auto", maxWidth: "161px" }}
            priority
            unoptimized
          />
        </div>

        {/* Heading */}
        <p className="text-buddy-text mb-2 text-center text-base leading-snug">Get Started Now</p>
        <h1 className="text-buddy-heading mb-12 text-center text-[28px] leading-tight font-medium">
          Registration
        </h1>

        {/* Google register button */}
        <GoogleSignInButton label="Register with google" />

        {/* Divider */}
        <OrDivider />

        {/* Registration form */}
        <RegistrationForm />
      </div>
    </div>
  );
}
