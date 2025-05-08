"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import googleLogo from "@/public/images/google-logo.svg";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schema/auth";
import { z } from "zod";
import { toast } from "sonner";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Logo from "@/public/images/logo.svg";
import { login } from "@/features/auth/actions/authenticate";

export default function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Create a form using react-hook-form and zod for validation
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Create a submit handler for the form
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const result = await login(formData);
      if (result?.error) {
        toast.error(result.error, {
          duration: 4000,
        });
        return;
      }
      toast.success(result.success, {
        duration: 2000,
      });
      setTimeout(() => {
        router.push(routes.hrDashboard);
      }, 1000);
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
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Link
        href={routes.home}
        className="absolute top-10 left-10 flex items-center gap-2 group"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={40}
          priority
          className="group-hover:brightness-125 transition-all duration-300 ease-in-out"
        />
        <h1 className="font-black text-3xl text-primary group-hover:brightness-125 transition-all duration-300 ease-in-out">
          Zentry
        </h1>
      </Link>
      <div className="w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome to Zentry</h1>
          <p className="text-sm text-foreground/90">
            Please choose a way to Sign in to your account
          </p>
        </div>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Please enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Logging In...
                </>
              ) : (
                <>Login</>
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
        <div className="flex items-center justify-center gap-1 text-sm ">
          <p className="text-foreground/75">{"Don't have an account?"}</p>
          <Link
            href={routes.register}
            className="font-semibold underline hover:text-foreground/75"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
