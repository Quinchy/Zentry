import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();
  console.log("Session on server:", session);
  return (
    <>
      {session?.user?.email}
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit">Signin with Google</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  );
}
