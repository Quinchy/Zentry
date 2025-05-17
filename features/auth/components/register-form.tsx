"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/features/auth/schema/auth";
import { routes } from "@/routes";
import { Loader2 } from "lucide-react";
import googleLogo from "@/public/images/google-logo.svg";
import { z } from "zod";
import AppLogo from "@/components/ui/app-logo";

export default function RegisterForm({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      organizationName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result?.error) {
        toast.error(result.error, {
          duration: 4000,
        });
        return;
      }
      toast.success(result.success, {
        duration: 2000,
      });
      router.push(routes.dashboard);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
        { duration: 4000 },
      );
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    const res = await fetch("/api/auth/google");
    const { url, error } = await res.json();
    if (error) return toast.error(error);
    window.location.href = url;
  };
  return (
    <div className={`${className}`}>
      <div className="w-full max-w-lg space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Get started with Zentry
          </h1>
          <p className="text-sm text-foreground/90">
            Please choose a way to Sign up an account
          </p>
        </div>
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={registerForm.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter your organization name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 items-start">
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your first name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your last name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 items-start">
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Please enter your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Please re-enter your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Registering...
                </>
              ) : (
                <>Register</>
              )}
            </Button>
          </form>
        </Form>

        <div className="flex items-center text-sm text-dark-primary/75 gap-2">
          <div className="h-[1px] w-full bg-border" />
          <p>or</p>
          <div className="h-[1px] w-full bg-border" />
        </div>

        <Button
          variant="outline"
          className="w-full gap-1"
          onClick={googleLogin}
          disabled={loading}
        >
          <Image
            src={googleLogo}
            alt="Google logo"
            width={20}
            height={20}
            quality={100}
          />
          Continue with Google
        </Button>

        <div className="flex items-center justify-center gap-1 text-sm">
          <p className="text-foreground/75">{"Already have an account?"}</p>
          <Link
            href={routes.login}
            className="font-semibold underline hover:text-foreground/75"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
