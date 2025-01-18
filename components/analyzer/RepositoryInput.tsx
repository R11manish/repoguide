"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import MarkdownAnalysis from "./MarkdownAnalysis";

export default function RepositoryAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAnalysis(true);
    // The actual analysis will be handled by the MarkdownAnalysis component
  };

  const handleReset = () => {
    setShowAnalysis(false);
    setRepoUrl("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="repo-url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              GitHub Repository URL
            </label>
            <input
              id="repo-url"
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              disabled={showAnalysis}
            />
          </div>

          {!showAnalysis ? (
            <button
              type="submit"
              disabled={isLoading || !repoUrl}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold flex items-center justify-center ${
                isLoading || !repoUrl
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FiGithub className="mr-2" />
              Analyze Repository
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-md text-white font-semibold bg-gray-600 hover:bg-gray-700 flex items-center justify-center"
            >
              Analyze Another Repository
            </button>
          )}
        </form>
      </motion.div>

      {showAnalysis && <MarkdownAnalysis repoUrl={repoUrl} />}
    </div>
  );
}
