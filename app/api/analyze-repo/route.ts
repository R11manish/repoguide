import { streamText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";
import { SYSTEM_PROMPT } from "./prompt";
import { RepomixResult, runRepomix } from "./lib";

export async function POST(req: Request) {
  try {
    let { repoUrl } = await req.json();
    let repoContent: RepomixResult = await runRepomix(repoUrl);

    if (repoContent.success) {
      console.log("Repository mixed successfully!");
      if (repoContent.output) {
        console.log("Repository content:", repoContent.output);
      } else {
        repoContent = { success: false, output: "" };
      }
    }

    const result = streamText({
      model: deepseek("deepseek-chat"),
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here's the repository content to analyze:\n\n${repoContent.output}`,
        },
      ],
      temperature: 0.7,
      maxTokens: 4000,
    });

    console.log("DeepSeek result:", result);

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
