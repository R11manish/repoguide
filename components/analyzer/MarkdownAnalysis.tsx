"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

interface AnalysisResult {
  content: string;
  error?: string;
  isLoading: boolean;
}

const MarkdownAnalysis = ({ repoUrl }: { repoUrl: string }) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
    content: "",
    isLoading: true,
  });

  // Use a buffer to collect content before updating state
  const contentBuffer = useRef<string>("");
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  // Debounced update function
  const updateContent = (newContent: string) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      setAnalysisResult((prev) => ({
        ...prev,
        content: newContent,
        isLoading: false,
      }));
    }, 100); // Delay updates by 100ms
  };

  const components: Partial<Components> = {
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="text-gray-700 dark:text-gray-300">{children}</li>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
        {children}
      </code>
    ),
    hr: () => (
      <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />
    ),
  };

  const processStreamData = (text: string) => {
    const lines = text.split("\n");
    let processedContent = "";

    lines.forEach((line) => {
      const match = line.match(/^([fed0]):(.+)$/);
      if (match) {
        const [, type, content] = match;
        try {
          const parsed = JSON.parse(content);
          if (type === "0") {
            processedContent += parsed;
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        processedContent += line + "\n";
      }
    });

    return processedContent;
  };

  const fetchAnalysis = async () => {
    try {
      const response = await fetch("/api/analyze-repo", {
        method: "POST",
        body: JSON.stringify({ repoUrl: repoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to analyze repository");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No readable stream available");
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        buffer += chunk;

        // Only process complete messages
        if (buffer.includes("\n")) {
          const processedContent = processStreamData(buffer);
          contentBuffer.current = processedContent;
          updateContent(processedContent);
        }
      }

      // Final update
      const finalContent = processStreamData(buffer);
      setAnalysisResult((prev) => ({
        ...prev,
        content: finalContent,
        isLoading: false,
      }));
    } catch (error) {
      setAnalysisResult((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchAnalysis();

    // Cleanup timeouts
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [repoUrl]);

  if (analysisResult.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-gray-600">Analyzing repository content...</p>
      </div>
    );
  }

  if (analysisResult.error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Analysis Failed</AlertTitle>
        <AlertDescription>{analysisResult.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-full mt-5 mx-auto">
      <CardHeader>
        <CardTitle>Repository Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate dark:prose-invert max-w-none overflow-hidden">
          <ReactMarkdown components={components} className="markdown-content">
            {analysisResult.content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownAnalysis;
