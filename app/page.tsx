// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome to NoteSpace</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to manage your notes and use the chatbot.
        </p>
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          Welcome back, {session.user?.name || "User"} 👋
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your notes or chat with your AI assistant.
        </p>

        <div className="flex gap-4">
          <Link href="/api/notes">
            <Button variant="default">View Notes</Button>
          </Link>
          <Link href="/chat">
            <Button variant="secondary">AI Chatbot</Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button variant="destructive">Sign Out</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
