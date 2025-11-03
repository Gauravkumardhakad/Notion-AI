import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function RealHome() {
  const session=await getServerSession();
  console.log(session);

  return (
    <div>
      {session?.user?.email}
    </div>
  );
}
