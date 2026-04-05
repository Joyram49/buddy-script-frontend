import Link from "next/link";

interface RegistrationFormProps {
  onSubmit?: (e: React.FormEvent) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  return (
    <form className="space-y-3.5" noValidate onSubmit={onSubmit}>
      {/* Email field */}
      <div>
        <label htmlFor="reg-email" className="text-buddy-label mb-2 block text-base font-medium">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
        />
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="reg-password" className="text-buddy-label mb-2 block text-base font-medium">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
        />
      </div>

      {/* Repeat Password field */}
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

      {/* Terms & conditions checkbox */}
      <label className="text-buddy-text flex cursor-pointer items-start gap-2 pt-2 text-sm">
        <input
          type="checkbox"
          name="terms"
          className="border-buddy-accent accent-buddy-accent mt-0.5 size-4 shrink-0 rounded-full border-2"
        />
        I agree to terms &amp; conditions
      </label>

      {/* Submit button */}
      <div className="pt-8 pb-12">
        <button
          type="submit"
          className="bg-buddy-accent w-full rounded-md px-4 py-3 text-center text-base font-medium text-white transition hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        >
          Register now
        </button>
      </div>

      {/* Sign in link */}
      <p className="text-buddy-muted text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-buddy-accent hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
