import { RegistrationBackgroundShapes } from ".//RegistrationBackgroundShapes";
import { RegistrationHeroImage } from ".//RegistrationHeroImage";
import { RegistrationCard } from ".//RegistrationCard";

export function RegistrationPage() {
  return (
    // Outer div catches any overflow that escapes the section's stacking context
    // due to negative z-index children (next/image shape wrappers).
    <div className="overflow-hidden">
      <section className="bg-buddy-canvas font-poppins relative z-1 overflow-hidden py-16 md:py-24">
        {/* Decorative background shapes */}
        <RegistrationBackgroundShapes />

        <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-3">
            {/* Left: hero illustration — visible on all screen sizes */}
            <RegistrationHeroImage />

            {/* Right: registration card */}
            <RegistrationCard />
          </div>
        </div>
      </section>
    </div>
  );
}
