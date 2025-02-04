'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/Modal';
import { Edit2, Trash2, X, Check, ArrowLeft } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
          setForm({ title: data.title, author: data.author, content: data.content });
        } else {
          router.push('/blog');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updatedPost = await res.json();
      setPost(updatedPost);
      setIsEditing(false);
    } else {
      const data = await res.json();
      setError(data.error || 'Update failed.');
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.push('/blog');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

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

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent 
                            bg-gradient-to-r from-purple-400 to-purple-600">
                Edit Blog Post
              </h1>
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 mb-4 p-4 bg-red-500/10 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-gray-100 border border-purple-500/20
                             p-4 rounded-lg focus:outline-none focus:ring-2 
                             focus:ring-purple-500 transition-all duration-200"
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
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg
                             hover:bg-purple-500 transition-colors duration-200
                             flex items-center gap-2 shadow-lg shadow-purple-500/25"
                  >
                    <Check className="w-5 h-5" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg
                             hover:bg-gray-600 transition-colors duration-200
                             flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent 
                            bg-gradient-to-r from-purple-400 to-purple-600">
                {post.title}
              </h1>
              <p className="text-gray-400 mb-8 text-lg">By {post.author}</p>
              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-500 transition-colors duration-200
                           flex items-center gap-2 shadow-lg shadow-purple-500/25"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Post
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg
                           hover:bg-red-600 transition-colors duration-200
                           flex items-center gap-2 shadow-lg shadow-red-500/25"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Post
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal show={showModal} title="Delete Post" onClose={() => setShowModal(false)}>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-lg
                     hover:bg-red-600 transition-colors duration-200
                     flex-1 shadow-lg shadow-red-500/25"
          >
            Delete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(false)}
            className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg
                     hover:bg-gray-600 transition-colors duration-200
                     flex-1"
          >
            Cancel
          </motion.button>
        </div>
      </Modal>
    </motion.div>
  );
}