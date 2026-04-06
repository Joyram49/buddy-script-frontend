/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/hooks/auth/auth.hooks";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const isSubmitting = loginMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });
      toast.success("Welcome back.");
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.message ?? "Login failed. Please check your credentials.");
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-3.5" noValidate onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-buddy-label mb-2 block text-base font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  className="border-buddy-border bg-buddy-surface text-buddy-text focus-visible:border-buddy-accent focus-visible:ring-buddy-accent/25 h-12 rounded-md px-4 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-buddy-label mb-2 block text-base font-medium">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  className="border-buddy-border bg-buddy-surface text-buddy-text focus-visible:border-buddy-accent focus-visible:ring-buddy-accent/25 h-12 rounded-md px-4 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 pt-2 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <label className="text-buddy-text flex cursor-pointer items-center gap-2 text-sm">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      className="border-buddy-accent accent-buddy-accent size-4 shrink-0 rounded-full border-2"
                    />
                  </FormControl>
                  Remember me
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-buddy-accent text-right text-sm sm:pt-0.5">Forgot password?</p>
        </div>

        <div className="pt-8 pb-12">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-buddy-accent hover:bg-buddy-accent/90 h-auto w-full rounded-md px-4 py-3 text-base font-medium text-white"
          >
            {isSubmitting ? "Logging in..." : "Login now"}
          </Button>
        </div>

        <p className="text-buddy-muted text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-buddy-accent hover:underline">
            Create New Account
          </Link>
        </p>
      </form>
    </Form>
  );
}
