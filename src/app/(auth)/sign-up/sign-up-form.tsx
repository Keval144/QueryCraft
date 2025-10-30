//app/(auth)/sign-up/sign-up-form.tsx

"use client";

import { passwordSchema } from "@/lib/validation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { LoadingButton } from "@/components/auth/loading-button";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUpSchema = z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Please enter a valid email" }),
      password: passwordSchema,
      passwordConfirmation: z
        .string()
        .min(1, { message: "Please confirm password" }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  type SignUpValues = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit({ email, password, name }: SignUpValues) {
    setError(null);

    await authClient.signUp.email(
      {
        email,
        name,
        password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          toast.success("Account Created Successfully");
          router.push("/dashboard");
          setTimeout(() => {
            toast.success("Automaticaly Signed In");
          }, 2000);
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Something went wrong");
          if (ctx.error.message!) {
            toast.error("Oops! Something went wrong!");
          }
        },
      }
    );

    form.reset();
  }

  const loading = form.formState.isSubmitting;

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password confirmation */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div role="alert" className="text-sm text-red-600">
                  {error}
                </div>
              )}

              <LoadingButton type="submit" className="w-full" loading={loading}>
                Create an account
              </LoadingButton>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center border-t pt-4">
            <p className="text-muted-foreground text-center text-xs">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpForm;
