import { motion } from 'framer-motion'

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Analyzing your repository...</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This may take a few moments</p>
    </motion.div>
  )
}

