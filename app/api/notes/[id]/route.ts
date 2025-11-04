import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";


export async function PUT(req:NextRequest,context: { params: Promise<{ id: string }> }){
    const params=await context.params;
    const session=await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {title, content}=await req.json();
    const noteId=params.id;

    //console.log(typeof(noteId));

    if (!title || !content) {
        return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
    }

    const note=await prisma.note.findFirst({
        where:{
            id:parseInt(noteId)
        },
        include:{
            user:true
        }
    })

    if(!note){
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (note.user.email !== session.user.email) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedNote = await prisma.note.update({
        where: { id: parseInt(noteId) },
        data: { title, content },
    });

    return NextResponse.json(updatedNote);
}   


export async function DELETE(req:NextRequest,context:{params:Promise<{ id:string }>}){
    const params=await context.params;
    const session=await getServerSession();

    if(!session || !session.user?.email){
        return NextResponse.json({error:"anauthorized"},{status:401});
    }

    const noteId=parseInt(params.id);

    const note=await prisma.note.findFirst({
        where:{
            id:noteId
        },
        include:{
            user:true
        }
    })

    if(!note){
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (note.user.email !== session.user.email) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.note.delete({
        where:{
            id:noteId
        }
    });

    return NextResponse.json({msg:"Note deleted successfully"});
}