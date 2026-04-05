import Link from "next/link";

interface LoginFormProps {
  onSubmit?: (e: React.FormEvent) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form
      className="space-y-3.5"
      noValidate
      onSubmit={onSubmit}
    >
      {/* Email field */}
      <div>
        <label
          htmlFor="login-email"
          className="text-buddy-label mb-2 block text-base font-medium"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className="border-buddy-border bg-buddy-surface text-buddy-text placeholder:text-buddy-text/80 focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
          placeholder=""
        />
      </div>

      {/* Password field */}
      <div>
        <label
          htmlFor="login-password"
          className="text-buddy-label mb-2 block text-base font-medium"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className="border-buddy-border bg-buddy-surface text-buddy-text focus:border-buddy-accent focus:ring-buddy-accent/25 h-12 w-full rounded-md border px-4 text-base transition outline-none focus:ring-2"
        />
      </div>

      {/* Remember me & Forgot password */}
      <div className="grid gap-4 pt-2 sm:grid-cols-2">
        <label className="text-buddy-text flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="remember"
            className="border-buddy-accent accent-buddy-accent size-4 shrink-0 rounded-full border-2"
          />
          Remember me
        </label>
        <p className="text-buddy-accent text-right text-sm sm:pt-0.5">
          Forgot password?
        </p>
      </div>

      {/* Submit button */}
      <div className="pt-8 pb-12">
        <button
          type="submit"
          className="bg-buddy-accent w-full rounded-md px-4 py-3 text-center text-base font-medium text-white transition hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        >
          Login now
        </button>
      </div>

      {/* Register link */}
      <p className="text-buddy-muted text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-buddy-accent hover:underline">
          Create New Account
        </Link>
      </p>
    </form>
  );
}
