import { streamText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";
import { ignorePatterns, SYSTEM_PROMPT } from "./prompt";
import { analyzeGitRepo } from "./lib";

export async function POST(req: Request) {
  try {
    let { repoUrl } = await req.json();
    let repoContent = await analyzeGitRepo({
      github_url: repoUrl,
      max_file_size: 51200,
    });

    console.log(repoContent);

    const result = streamText({
      model: deepseek("deepseek-coder"),
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here's the repository content to analyze:\n\n${
            (repoContent.tree, repoContent.content)
          }`,
        },
      ],
      temperature: 0.6,
      maxTokens: 4000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error analyzing repository:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to analyze repository",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
