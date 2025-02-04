import { NextResponse } from "next/server";
import { getBlogData } from "@/lib/data";
import { error } from "console";

export async function GET(request: Request, { params }: { params: { id: string }}) {
    const data = getBlogData();
    const postId = parseInt(params.id, 10);
    const post = data.posts.find((p) => p.id === postId);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { id: string }}) {
    const data = getBlogData();
    const postId = parseInt(params.id, 10);
    const index = data.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, author, content } = body;

    if (!title || !author || !content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    data.posts[index] = { id: postId, title, author, content };
    return NextResponse.json(data.posts[index]);
}

export async function DELETE(request: Request, { params }: {params: { id: string }}) {
    const data = getBlogData();
    const postId = parseInt(params.id, 10);
    const index = data.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts.splice(index, 1);
    return NextResponse.json({ message: 'Post deleted successfully' });
}