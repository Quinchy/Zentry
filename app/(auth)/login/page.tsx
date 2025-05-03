import Image from "next/image";
import Test from "@/public/images/test.jpg";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <LoginForm className="col-span-2" />
      <div className="col-span-3 overflow-hidden">
        <Image
          src={Test}
          alt="test"
          width={Test.width}
          height={Test.height}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
