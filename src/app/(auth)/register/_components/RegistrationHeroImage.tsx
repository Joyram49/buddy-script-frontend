import { buddyAsset } from "@/features/buddyscript/assets";
import Image from "next/image";

/**
 * Left-column hero illustration.
 * Original HTML: col-xl-8 col-lg-8 col-md-12 col-sm-12 — visible on ALL screen sizes.
 * next/image with style width/height override replicates natural <img> sizing.
 */
export function RegistrationHeroImage() {
  return (
    <div className="lg:col-span-8">
      <div className="flex w-full justify-center">
        <Image
          src={buddyAsset("Registration")}
          alt="buddy-registration"
          width={850}
          height={637}
          style={{ width: "100%", height: "auto", maxWidth: "850px" }}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
