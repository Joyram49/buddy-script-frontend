import Image from "next/image";
import { buddyAsset } from "@/features/buddyscript/assets";

/**
 * Decorative background shapes — three groups matching the original HTML's
 * _shape_one / _shape_two / _shape_three divs.
 *
 * We use next/image with a large placeholder width/height combined with
 * style={{ width: "100%", height: "auto" }} to replicate the original
 * <img class="_shape_img"> natural fluid-SVG behaviour, while satisfying
 * Next.js Image's requirement for explicit dimensions.
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

export function LoginBackgroundShapes() {
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
          alt="Dark-shape-1"
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
          alt=""
          width={800}
          height={600}
          style={shapeImgStyle}
          unoptimized
        />
        <Image
          src={buddyAsset("DarkShape2")}
          alt=""
          width={800}
          height={600}
          style={{ ...shapeOverlayStyle, opacity: 0.8 }}
          unoptimized
        />
      </div>
    </>
  );
}
