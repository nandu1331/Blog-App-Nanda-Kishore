import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const snippet = post.content.substring(0, 100) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-8
                 shadow-lg hover:shadow-2xl transform transition-all duration-300
                 border border-purple-500/10 backdrop-blur-sm"
    >
      <div className="relative overflow-hidden">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 to-purple-600 
                       leading-tight mb-3">
          {post.title}
        </h2>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {post.author[0].toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            By <span className="text-purple-400">{post.author}</span>
          </p>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {snippet}
        </p>

        <Link href={`/blog/posts/${post.id}`}>
          <motion.div
            whileHover={{ x: 5 }}
            className="inline-flex items-center group"
          >
            <span className="text-purple-400 font-medium group-hover:text-purple-300
                           transition-colors duration-200">
              Read More
            </span>
            <svg 
              className="w-4 h-4 ml-2 text-purple-400 group-hover:text-purple-300
                         transform group-hover:translate-x-1 transition-all duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}