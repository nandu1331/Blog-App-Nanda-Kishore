'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Search, PenSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

interface Data {
  posts: Post[];
  totalPages: number;
}

export default function BlogHome() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${page}&search=${search}`);
        const data: Data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
    router.replace(`/blog?search=${searchInput}&page=1`);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    router.replace(`/blog?search=${search}&page=${newPage}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 md:px-16"
    >
      <div className="max-w-4xl mx-auto">
        <nav className="mb-12 flex justify-end">
          <Link href="/blog/create">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg
                         hover:bg-purple-500 transition-colors duration-200 
                         flex items-center gap-2 shadow-purple-500/25"
            >
              <PenSquare className="w-5 h-5" />
              <span>Create Blog</span>
            </motion.div>
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border border-purple-500/20
                           p-4 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-purple-500 transition-all duration-200
                           placeholder:text-gray-500"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 
                                text-gray-500 pointer-events-none" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-4 bg-purple-600 text-white rounded-lg shadow-lg
                         hover:bg-purple-500 transition-colors duration-200
                         font-medium shadow-purple-500/25"
            >
              Search
            </motion.button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="w-12 h-12 border-4 border-purple-500/20 
                             border-t-purple-500 rounded-full animate-spin" />
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 py-12"
            >
              No posts found.
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {posts.length > 0 && (
          <motion.div 
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {page > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 bg-gray-800 text-purple-400 rounded-lg
                           hover:bg-gray-700 transition-colors duration-200
                           flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>
            )}
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 bg-gray-800 text-purple-400 rounded-lg
                           hover:bg-gray-700 transition-colors duration-200
                           flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}