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
import { useRegisterMutation } from "@/hooks/auth/auth.hooks";

const registrationSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.email("Enter a valid email address."),
    password: z.string().trim().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().trim().min(8, "Please confirm your password."),
    terms: z.boolean().refine((value) => value, "You must agree to terms & conditions."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const isSubmitting = registerMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success("Registration successful. Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message ?? "Registration failed. Please try again.");
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-3.5" noValidate onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-buddy-label mb-2 block text-base font-medium">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="name"
                  className="border-buddy-border bg-buddy-surface text-buddy-text focus-visible:border-buddy-accent focus-visible:ring-buddy-accent/25 h-12 rounded-md px-4 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  autoComplete="new-password"
                  className="border-buddy-border bg-buddy-surface text-buddy-text focus-visible:border-buddy-accent focus-visible:ring-buddy-accent/25 h-12 rounded-md px-4 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-buddy-label mb-2 block text-base font-medium">
                Repeat Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  className="border-buddy-border bg-buddy-surface text-buddy-text focus-visible:border-buddy-accent focus-visible:ring-buddy-accent/25 h-12 rounded-md px-4 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <label className="text-buddy-text flex cursor-pointer items-start gap-2 pt-2 text-sm">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="border-buddy-accent accent-buddy-accent mt-0.5 size-4 shrink-0 rounded-full border-2"
                  />
                </FormControl>
                I agree to terms &amp; conditions
              </label>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-8 pb-12">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-buddy-accent hover:bg-buddy-accent/90 h-auto w-full rounded-md px-4 py-3 text-base font-medium text-white"
          >
            {isSubmitting ? "Registering..." : "Register now"}
          </Button>
        </div>

        <p className="text-buddy-muted text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-buddy-accent hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
