import { buddyAsset } from "@/features/buddyscript/assets";
import Image from "next/image";

interface GoogleSignInButtonProps {
  label?: string;
  onClick?: () => void;
}

export function GoogleSignInButton({
  label = "Or sign-in with google",
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-buddy-canvas bg-buddy-surface hover:bg-buddy-canvas/80 mb-10 flex w-full items-center justify-center gap-2 rounded-md border px-8 py-3 transition"
    >
      <Image
        src={buddyAsset("Google")}
        alt="Google-svg"
        width={20}
        height={20}
        style={{ width: "20px", height: "20px", flexShrink: 0 }}
        unoptimized
      />
      <span className="text-buddy-heading text-base font-medium">{label}</span>
    </button>
  );
}
