import { streamText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";
import { ignorePatterns, SYSTEM_PROMPT } from "./prompt";
import { analyzeGitRepo } from "./lib";

export async function POST(req: Request) {
  try {
    let { repoUrl } = await req.json();
    let repoContent = await analyzeGitRepo({
      github_url: repoUrl,
      max_file_size: 6400,
    });

    console.log(repoContent.tree);

    const result = streamText({
      model: deepseek("deepseek-coder"),
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `This is the directory structure of the Project :\n\n${repoContent.tree}  Here's the repository content to analyze:\n\n${repoContent.content}`,
        },
      ],
      temperature: 0,
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
