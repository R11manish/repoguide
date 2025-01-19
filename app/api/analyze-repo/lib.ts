interface GitAnalyzerParams {
  github_url: string;
  max_file_size?: number;
  include_patterns?: string[] | string;
  exclude_patterns?: string[] | string;
}

interface GitAnalyzerResponse {
  summary: any;
  tree: any;
  content: any;
}

export const analyzeGitRepo = async (
  params: GitAnalyzerParams
): Promise<GitAnalyzerResponse> => {
  if (!process.env.AWS_URL) {
    throw new Error("AWS_URL environment variable is not defined");
  }

  try {
    const response = await fetch(process.env.AWS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to analyze repository: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
};
