import Image from "next/image";
import Shape1 from "@/assets/images/shape1.svg";
import DarkShape from "@/assets/images/dark_shape.svg";
import Shape2 from "@/assets/images/shape2.svg";
import DarkShape1 from "@/assets/images/dark_shape1.svg";
import Shape3 from "@/assets/images/shape3.svg";
import DarkShape2 from "@/assets/images/dark_shape2.svg";

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
          src={Shape1}
          alt=""
          width={800}
          height={600}
          style={shapeImgStyle}
          priority
          unoptimized
        />
        <Image
          src={DarkShape}
          alt=""
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
        <Image src={Shape2} alt="" width={800} height={600} style={shapeImgStyle} unoptimized />
        <Image
          src={DarkShape1}
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
        <Image src={Shape3} alt="" width={800} height={600} style={shapeImgStyle} unoptimized />
        <Image
          src={DarkShape2}
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
