"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { addOrgSchema } from "@/features/auth/schema/auth";
import { useState } from "react";
import AppLogo from "@/components/ui/app-logo";
import { createOrg } from "../actions/create-org";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

export default function AddOrgForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addOrgForm = useForm<z.infer<typeof addOrgSchema>>({
    resolver: zodResolver(addOrgSchema),
    defaultValues: {
      organizationName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof addOrgSchema>) => {
    setLoading(true);
    try {
      const result = await createOrg(data);
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
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8/12 flex flex-col justify-center items-center gap-5">
      <AppLogo />
      <Form {...addOrgForm}>
        <form onSubmit={addOrgForm.handleSubmit(onSubmit)}>
          <Card className="min-w-xs lg:min-w-lg">
            <CardHeader>
              <CardTitle>Add Organization</CardTitle>
              <CardDescription>
                Please create an organization to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={addOrgForm.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Organization Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Organization"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
