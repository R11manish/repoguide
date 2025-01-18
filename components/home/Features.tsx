"use client"

import { motion } from 'framer-motion'
import { FiCode, FiTrendingUp, FiShield, FiZap } from 'react-icons/fi'

const features = [
  {
    icon: <FiCode />,
    title: 'Code Quality Analysis',
    description: 'Get detailed insights on your code quality, including suggestions for improvements.'
  },
  {
    icon: <FiTrendingUp />,
    title: 'Performance Optimization',
    description: 'Identify performance bottlenecks and receive optimization recommendations.'
  },
  {
    icon: <FiShield />,
    title: 'Security Scanning',
    description: 'Detect potential security vulnerabilities in your codebase.'
  },
  {
    icon: <FiZap />,
    title: 'AI-Powered Suggestions',
    description: 'Receive intelligent suggestions for code refactoring and best practices.'
  }
]

export default function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-3xl mb-4 text-blue-600 dark:text-blue-400">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

