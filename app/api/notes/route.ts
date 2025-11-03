import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req:NextRequest){

  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user=await prisma.user.findUnique({
    where:{
      email:session.user.email
    }
  })

  if(!user){
    return NextResponse.json({ error: "user not found" }, { status: 401 });
  }

  const notes=await prisma.note.findMany({
    where:{
      userId:user.id,
    }
  })
  
  return NextResponse.json(notes);

}

export async function POST(req: NextRequest) {

  const session = await getServerSession();

  console.log(session);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId: user.id,
    },
  });

  return NextResponse.json(note);
}


