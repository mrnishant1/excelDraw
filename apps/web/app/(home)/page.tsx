import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // import your NextAuth config


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      Logged in as: {session.user.email} <br />
      User ID: {session.user.id}
    </div>
  );
}
