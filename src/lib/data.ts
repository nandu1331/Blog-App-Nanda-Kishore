declare global {
    var blogData: {
        posts: {
            id: number;
            title: string;
            author: string;
            content: string;
        }[];
        idCounter: number;
    } | undefined;
}

if (!global.blogData) {
    global.blogData = { 
        posts: [],
        idCounter: 1
    };
}

export const getBlogData = () => global.blogData!;