import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

export function Input({ className, type = "text", ...props }: InputProps) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";
  // if it's a password field, toggle between "password" and "text"
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input/85 flex h-10 w-full min-w-0 rounded-md border-[2px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isPassword && "pr-10",
          className,
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute inset-y-0 right-3 flex items-center justify-center"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <div className="hover:cursor-pointer hover:bg-accent p-2 rounded transition-all duration-300 ease-in-out">
              <Eye className="h-4 w-4 stroke-input" />
            </div>
          ) : (
            <div className="hover:cursor-pointer hover:bg-accent p-2 rounded">
              <EyeOff className="h-4 w-4 stroke-input" />
            </div>
          )}
        </button>
      )}
    </div>
  );
}
