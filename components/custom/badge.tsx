import { FC, ReactNode } from "react";

type BadgeProps = {
  icon: ReactNode;
  label: string;
};

export const Badge: FC<BadgeProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-primary/65 text-xs text-primary/85 shadow-sm">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};