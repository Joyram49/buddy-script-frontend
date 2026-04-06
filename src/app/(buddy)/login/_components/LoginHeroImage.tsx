import { buddyAsset } from "@/features/buddyscript/assets";
import Image from "next/image";

/**
 * Left-column hero illustration.
 * Matches original: col-xl-8 col-lg-8, _social_login_left_image img.
 * next/image with style width/height override replicates natural <img> sizing.
 */
export function LoginHeroImage() {
  return (
    // Original HTML: col-xl-8 col-lg-8 col-md-12 col-sm-12 — visible on ALL screen sizes
    <div className="lg:col-span-8">
      <div className="flex justify-start">
        <Image
          src={buddyAsset("Login")}
          alt="login-hero-img"
          width={633}
          height={480}
          style={{ width: "100%", height: "auto", maxWidth: "633px" }}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
