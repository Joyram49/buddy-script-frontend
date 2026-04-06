import Image from "next/image";
import { buddyAsset } from "@/features/buddyscript/assets";

/**
 * Decorative background shapes — identical to LoginBackgroundShapes.
 * Shares the same SVG assets and positioning logic.
 * See LoginBackgroundShapes for full explanation of the next/image + style pattern.
 */

const shapeImgStyle = { width: "100%", height: "auto", display: "block" } as const;
const shapeOverlayStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  display: "block",
} as const;

export function RegistrationBackgroundShapes() {
  return (
    <>
      {/* _shape_one — top-left */}
      <div
        className="pointer-events-none absolute top-0 left-0 -z-10 overflow-hidden"
        style={{ maxWidth: "100vw" }}
      >
        <Image
          src={buddyAsset("Shape1")}
          alt="Shape-1"
          width={800}
          height={600}
          style={shapeImgStyle}
          priority
          unoptimized
        />
        <Image
          src={buddyAsset("DarkShape")}
          alt="Dark-shape"
          width={800}
          height={600}
          style={shapeOverlayStyle}
          priority
          unoptimized
        />
      </div>

      {/* _shape_two — top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 -z-10 hidden overflow-hidden sm:block"
        style={{ maxWidth: "50vw" }}
      >
        <Image
          src={buddyAsset("Shape2")}
          alt="Shape-2"
          width={800}
          height={600}
          style={shapeImgStyle}
          unoptimized
        />
        <Image
          src={buddyAsset("DarkShape1")}
          alt=""
          width={800}
          height={600}
          style={{ ...shapeOverlayStyle, opacity: 0 }}
          unoptimized
        />
      </div>

      {/* _shape_three — bottom-right */}
      <div
        className="pointer-events-none absolute bottom-0 -z-10 hidden overflow-hidden lg:block"
        style={{ right: "17%", maxWidth: "40vw" }}
      >
        <Image
          src={buddyAsset("Shape3")}
          alt="shape-3"
          width={800}
          height={600}
          style={shapeImgStyle}
          unoptimized
        />
        <Image
          src={buddyAsset("DarkShape2")}
          alt="Dark-shape-2"
          width={800}
          height={600}
          style={{ ...shapeOverlayStyle, opacity: 0.8 }}
          unoptimized
        />
      </div>
    </>
  );
}
