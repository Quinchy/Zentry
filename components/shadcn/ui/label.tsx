"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";

import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
}

export function Label({
  className,
  required = false,
  children,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <Asterisk className="inline-block -mt-0.5 h-3 w-3" />
      )}
    </LabelPrimitive.Root>
  );
}
