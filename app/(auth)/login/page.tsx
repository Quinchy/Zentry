import LoginForm from "@/features/auth/components/login-form";
import AuthLayout from "@/features/auth/components/layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm className="col-span-2" />
    </AuthLayout>
  );
}
