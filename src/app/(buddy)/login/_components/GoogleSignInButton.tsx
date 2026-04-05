import Image from "next/image";
import GoogleSvg from "@/assets/images/google.svg";

interface GoogleSignInButtonProps {
  onClick?: () => void;
}

export function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-buddy-canvas bg-buddy-surface hover:bg-buddy-canvas/80 mb-10 flex w-full items-center justify-center gap-2 rounded-md border px-8 py-3 transition"
    >
      <Image
        src={GoogleSvg}
        alt=""
        width={20}
        height={20}
        style={{ width: "20px", height: "20px", flexShrink: 0 }}
        unoptimized
      />
      <span className="text-buddy-heading text-base font-medium">Or sign-in with google</span>
    </button>
  );
}
