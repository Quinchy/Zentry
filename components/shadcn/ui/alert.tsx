// src/components/shadcn/ui/alert.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        error: "bg-red-200 text-red-700 border-red-400 [&>svg]:text-red-500",
        success:
          "bg-green-200 text-green-700 border-green-400 [&>svg]:text-green-500",
        info: "bg-blue-200 text-blue-700 border-blue-400 [&>svg]:text-blue-500",
        warning:
          "bg-orange-200 text-orange-700 border-orange-400 [&>svg]:text-orange-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AlertVariant = VariantProps<typeof alertVariants>["variant"];

// 1) Create a context so children can read the current variant
const AlertContext = React.createContext<{ variant: AlertVariant }>({
  variant: "default",
});

function Alert({
  className,
  variant,
  children,
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<"div"> & VariantProps<typeof alertVariants>
>) {
  return (
    <AlertContext.Provider value={{ variant }}>
      <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // 2) Grab the parent variant from context
  const { variant } = React.useContext(AlertContext);

  // 3) Map each variant to a lighter text color
  const descriptionColor: { [key in NonNullable<AlertVariant>]: string } = {
    default: "text-card-foreground",
    error: "text-red-700/75",
    success: "text-green-700/75",
    info: "text-blue-700/75",
    warning: "text-orange-700/75",
  };

  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        descriptionColor[variant ?? "default"],
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
