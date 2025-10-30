//app/(auth)/sign-up/sign-in-form.tsx

"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";

import { Checkbox } from "@/components/shadcn-ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { LoadingButton } from "@/components/auth/loading-button";
import { PasswordInput } from "@/components/auth/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

import { GithubIcon } from "lucide-react";
import { IconBrandGoogleFilled as GoogleIcon } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckRole } from "@/lib/check-role";

function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInSchema = z.object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
    rememberMe: z.boolean().optional(),
  });

  type SignInValues = z.infer<typeof signInSchema>;

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: SignInValues) {
    setError(null);
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe,
      },
      {
        onSuccess: async () => {
          try {
            const role = await CheckRole();

            if (!role) {
              toast.error("User role not found!");
              return router.push("/sign-in");
            }
            if (role === "admin") {
              toast.success("Welcome back, Admin!");
              router.push("/dashboard");
            } else if (role === "user") {
              toast.success("Welcome back!");
              router.push("/chats");
            } else {
              router.push("/");
            }
          } catch (err) {
            console.error("Error fetching session:", err);
            toast.error("Something went wrong while checking role.");
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Something went wrong");
          if (ctx.error.message!) {
            toast.error("Oops! Something went wrong!");
          }
        },
      }
    );
  }

  function handleSocialSignIn({ provider }: { provider: "Google" | "Github" }) {
    switch (provider) {
      case "Google":
        break;
      case "Github":
        break;
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
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
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      autoComplete="current-password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-border cursor-pointer border-gray-500/5"
                    />
                  </FormControl>
                  <FormLabel className="">Remember me</FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/forgot-password"
              className="text-muted-foreground ml-auto inline-block text-xs underline"
            >
              Forgot your password?
            </Link>
            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <LoadingButton type="submit" className="w-full" loading={loading}>
              Login
            </LoadingButton>

            <div className="flex w-full flex-col items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                disabled={loading}
                onClick={() => handleSocialSignIn({ provider: "Google" })}
              >
                <GoogleIcon width="0.98em" height="1em" />
                Sign in with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                disabled={loading}
                onClick={() => handleSocialSignIn({ provider: "Github" })}
              >
                <GithubIcon />
                Sign in with Github
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <p className="text-muted-foreground text-center text-xs">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
