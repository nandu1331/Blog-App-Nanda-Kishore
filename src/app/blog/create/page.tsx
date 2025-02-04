'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export default function CreatePost() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        const post = await res.json();
        setSuccess('Post created successfully!');
        setTimeout(() => router.push(`/blog/posts/${post.id}`), 1000);
      } else {
        const data = await res.json();
        setError(data.error || 'An error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 md:px-16"
    >
      <div className="max-w-3xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => router.push('/blog')}
          className="mb-8 text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </motion.button>

        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent 
                      bg-gradient-to-r from-purple-400 to-purple-600">
          Create a New Blog Post
        </h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 mb-6 p-4 
                     bg-red-500/10 rounded-lg"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 mb-6 p-4 
                     bg-green-500/10 rounded-lg"
          >
            <CheckCircle className="w-5 h-5" />
            {success}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-100 border border-purple-500/20
                       p-4 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-purple-500 transition-all duration-200"
              placeholder="Enter post title..."
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-100 border border-purple-500/20
                       p-4 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-purple-500 transition-all duration-200"
              placeholder="Enter author name..."
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              className="w-full bg-gray-800 text-gray-100 border border-purple-500/20
                       p-4 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-purple-500 transition-all duration-200"
              placeholder="Write your post content here..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg
                     hover:bg-purple-500 transition-colors duration-200
                     flex items-center gap-2 shadow-lg shadow-purple-500/25
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white 
                           rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Create Post
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
}