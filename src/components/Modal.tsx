import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ show, title, children, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-gradient-to-b from-gray-900 to-gray-800 w-full max-w-md 
                       rounded-xl shadow-2xl border border-purple-500/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold bg-clip-text text-transparent 
                              bg-gradient-to-r from-purple-400 to-purple-600">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-purple-500/10 
                           transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-purple-400" />
                </button>
              </div>
              
              <div className="text-gray-300">
                {children}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-3 bg-purple-600 text-white rounded-lg
                         font-medium hover:bg-purple-500 transition-colors
                         duration-200 shadow-lg shadow-purple-500/25"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}