import Link from "next/link";
import { buddyAsset } from "./assets";

export function RegistrationPage() {
  return (
    <section className="bg-buddy-canvas relative z-[1] overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute top-0 left-0 -z-10">
        <img
          src={buddyAsset("images/shape1.svg")}
          alt=""
          className="block h-auto w-full max-w-none"
        />
        <img
          src={buddyAsset("images/dark_shape.svg")}
          alt=""
          className="absolute top-0 left-0 block h-auto w-full max-w-none"
        />
      </div>
      <div className="pointer-events-none absolute top-0 right-5 -z-10 hidden sm:block">
        <img
          src={buddyAsset("images/shape2.svg")}
          alt=""
          className="block h-auto w-full max-w-none"
        />
        <img
          src={buddyAsset("images/dark_shape1.svg")}
          alt=""
          className="absolute top-0 left-0 block h-auto w-full max-w-none opacity-80"
        />
      </div>
      <div className="pointer-events-none absolute right-[20%] bottom-0 -z-10 hidden lg:block xl:right-[327px]">
        <img
          src={buddyAsset("images/shape3.svg")}
          alt=""
          className="block h-auto w-full max-w-none"
        />
        <img
          src={buddyAsset("images/dark_shape2.svg")}
          alt=""
          className="absolute top-0 left-0 block h-auto w-full max-w-none opacity-80"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-8 lg:block">
            <div className="relative mx-auto flex max-w-[633px] justify-center">
              <div className="relative aspect-[633/480] w-full overflow-hidden rounded-md bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={buddyAsset("images/registration.png")}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-buddy-surface rounded-md p-10 shadow-sm sm:p-12">
              <div className="mb-7 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={buddyAsset("images/logo.svg")}
                  alt="Buddy Script"
                  className="h-auto w-full max-w-[161px]"
                />
              </div>
              <p className="text-buddy-text mb-2 text-center text-base leading-snug">
                Get Started Now
              </p>
              <h1 className="text-buddy-heading mb-12 text-center text-[28px] leading-tight font-medium">
                Registration
              </h1>

              <button
                type="button"
                className="border-buddy-canvas bg-buddy-surface hover:bg-buddy-canvas/80 mb-10 flex w-full items-center justify-center gap-2 rounded-md border px-8 py-3 transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={buddyAsset("images/google.svg")} alt="" className="h-5 w-5 shrink-0" />
                <span className="text-buddy-heading text-base font-medium">
                  Register with google
                </span>
              </button>

              <div className="mb-10 flex items-center justify-center gap-4">
                <span className="bg-buddy-divider h-0.5 w-[108px] shrink-0 rounded-full" />
                <span className="text-buddy-subtle text-sm leading-snug">Or</span>
                <span className="bg-buddy-divider h-0.5 w-[108px] shrink-0 rounded-full" />
              </div>

              <form className="space-y-3.5" noValidate>
                <div>
                  <label
                    htmlFor="reg-email"
                    className="text-buddy-label mb-2 block text-base font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-password"
                    className="text-buddy-label mb-2 block text-base font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    autoComplete="new-password"
                    className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-password2"
                    className="text-buddy-label mb-2 block text-base font-medium"
                  >
                    Repeat Password
                  </label>
                  <input
                    id="reg-password2"
                    type="password"
                    autoComplete="new-password"
                    className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
                  />
                </div>

                <label className="text-buddy-text flex cursor-pointer items-start gap-2 pt-2 text-sm">
                  <input
                    type="checkbox"
                    name="terms"
                    className="border-buddy-accent accent-buddy-accent mt-0.5 size-4 shrink-0 rounded-full border-2"
                  />
                  I agree to terms & conditions
                </label>

                <div className="pt-8 pb-12">
                  <button
                    type="button"
                    className="bg-buddy-accent w-full rounded-md px-4 py-3 text-center text-base font-medium text-white transition hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
                  >
                    Login now
                  </button>
                </div>
              </form>

              <p className="text-buddy-muted text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-buddy-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
