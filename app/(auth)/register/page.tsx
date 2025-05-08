import RegisterForm from "@/features/auth/components/register-form";
import AuthLayout from "@/features/auth/components/layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <RegisterForm className="col-span-2" />
    </AuthLayout>
  );
}
