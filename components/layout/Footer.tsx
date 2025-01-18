import Link from 'next/link'
import { FiGithub, FiTwitter } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              RepoGuide
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} RepoGuide. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <FiGithub size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <FiTwitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

