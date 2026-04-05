import Image from "next/image";
import RegistrationImg from "@/assets/images/registration.png";

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
          src={RegistrationImg}
          alt=""
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
