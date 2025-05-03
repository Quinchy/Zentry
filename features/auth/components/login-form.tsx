"use client";

import Image from "next/image";
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
import { loginSchema } from "@/features/auth/schema/login";
import { z } from "zod";

export default function LoginForm({className}: { className?: string }) {
  // Create a form using react-hook-form and zod for validation
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // Create a submit handler for the form
  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
  }
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-8 ${className}`}
    >
      <div className="flex flex-col items-start gap-4 w-full max-w-sm">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome to Zentry</h1>
          <p className="text-sm text-foreground/90">Please choose a way to Sign in to your account</p>
        </div>
        <div className="w-full space-y-4">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your username"
                        {...field}
                      />
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
              <Button className="w-full">Login</Button>
            </form>
          </Form>
          <div className="flex items-center justify-between w-full text-sm text-dark-primary gap-2">
            <div className="h-[1px] w-full bg-border" />
            <p>or</p>
            <div className="h-[1px] w-full bg-border" />
          </div>
          <Button variant="outline" className="flex items-center w-full">
            <Image
              src={googleLogo}
              alt="Google logo"
              width={20}
              height={20}
              quality={100}
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
