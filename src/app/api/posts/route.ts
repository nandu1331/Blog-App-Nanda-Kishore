import { NextResponse } from "next/server";
import { getBlogData } from "@/lib/data";
import { error } from "console";

export async function GET(request: Request) {
    // Getting params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const pageSize = 5;

    const { posts } = getBlogData();

    // Filtering
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / pageSize);
    const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({ posts: paginatedPosts, totalPages });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, author, content } = body;

        if (!title || !author || !content) {
            return NextResponse.json({error: "Missing required fields"}, { status: 400 });
        }

        const data = getBlogData();
        const newPost = { id: data.idCounter++, title, author, content }
        data.posts.push(newPost);
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}