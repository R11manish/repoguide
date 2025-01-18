"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analyze Your GitHub Repos with AI
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get instant insights, code quality analysis, and improvement suggestions for your repositories.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/analyze" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center">
          <FiGithub className="mr-2" />
          Analyze Your Repo
        </Link>
      </motion.div>
    </section>
  )
}

