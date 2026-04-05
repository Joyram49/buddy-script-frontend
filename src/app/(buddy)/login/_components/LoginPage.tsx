import { LoginBackgroundShapes } from "./LoginBackgroundShapes";
import { LoginHeroImage } from "./LoginHeroImage";
import { LoginCard } from "./LoginCard";

export function LoginPage() {
  return (
    // Outer div catches any overflow that escapes the section's stacking context
    // due to negative z-index children (next/image shape wrappers).
    <div className="overflow-hidden">
      <section className="bg-buddy-canvas relative z-1 overflow-hidden py-16 md:py-24">
        {/* Decorative background shapes */}
        <LoginBackgroundShapes />

        <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left: hero illustration */}
            <LoginHeroImage />

            {/* Right: login card */}
            <LoginCard />
          </div>
        </div>
      </section>
    </div>
  );
}
