//app/(auth)/sign-up/sign-in-form.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogleFilled as GoogleIcon } from "@tabler/icons-react";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { LoadingButton } from "@/components/auth/loading-button";
import { PasswordInput } from "@/components/auth/password-input";
import QueryNex from "@/components/common/querynex";
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
import { authClient } from "@/lib/auth-client";
import { CheckRole } from "@/lib/check-role";
import { Badge } from "@/components/shadcn-ui/badge";

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
      },
    );
  }

  async function handleSocialSignIn({
    provider,
  }: {
    provider: "google" | "github";
  }) {
    try {
      setError(null);

      await authClient.signIn.social(
        { provider },
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
            toast.error(ctx.error.message || "Oops! Something went wrong!");
          },
        },
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Unexpected error during sign-in.");
    }
  }

  const loading = form.formState.isSubmitting;
  const lastUsed = authClient.getLastUsedLoginMethod();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <Link href={"/"}>
            <QueryNex className="text-2xl" />
          </Link>
        </CardTitle>
        <CardTitle className="text-xl">Sign In</CardTitle>
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

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="relative w-full">
              <LoadingButton type="submit" className="w-full" loading={loading}>
                Login
              </LoadingButton>
              {lastUsed === "email" && (
                <Badge className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 bg-black px-1.5 py-0 text-[10px] text-white opacity-80">
                  Last used
                </Badge>
              )}
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                className="relative w-full gap-2"
                disabled={loading}
                onClick={() => handleSocialSignIn({ provider: "google" })}
              >
                <GoogleIcon width="0.98em" height="1em" />
                Sign in with Google
                {lastUsed === "google" && (
                  <Badge className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 bg-black px-1.5 py-0 text-[10px] text-white opacity-80">
                    Last used
                  </Badge>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="relative w-full gap-2"
                disabled={loading}
                onClick={() => handleSocialSignIn({ provider: "github" })}
              >
                <GithubIcon />
                Sign in with Github
                {lastUsed === "github" && (
                  <Badge className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 bg-black px-1.5 py-0 text-[10px] text-white opacity-80">
                    Last used
                  </Badge>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <p className="text-muted-foreground text-center text-xs">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
