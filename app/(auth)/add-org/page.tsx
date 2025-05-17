import Test from "@/public/images/auth-background.webp";
import Image from "next/image";
import AddOrgForm from "@/features/auth/components/add-org-form";

export default function AddOrg() {
  return (
    <>
      <div className="relative w-screen h-screen">
        <AddOrgForm />
        <Image
          src={Test}
          alt="Auth Background Image"
          width={Test.width}
          height={Test.height}
          className="h-full w-full object-cover"
          quality={10}
          placeholder="blur"
          priority={true}
        />
      </div>
    </>
  );
}
