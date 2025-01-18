import { exec } from "child_process";
import { promisify } from "util";

// Convert exec to promise-based function
const execAsync = promisify(exec);

// Types and interfaces
export interface RepomixOptions {
  branch?: string;
  path?: string;
  silent?: boolean;
}

export interface RepomixResult {
  success: boolean;
  output?: string;
  error?: string;
}

interface ErrorMessages {
  [key: string]: string;
}

type CommandOutput = {
  stdout: string;
  stderr: string;
};

// Error handling constants
const ERROR_MESSAGES: ErrorMessages = {
  ENOENT: "pnpm is not installed. Please install pnpm first.",
  EACCES: "Permission denied. Try running with sudo or as administrator.",
  NETWORKISSUE: "Network error. Please check your internet connection.",
  INVALIDREPO: "Invalid repository URL provided.",
  REPOMIXERROR: "Error executing repomix command.",
};

function isValidGithubUrl(url: string): boolean {
  const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
  return githubUrlPattern.test(url);
}

function buildCommand(repoUrl: string, options: RepomixOptions): string {
  let command = `pnpm repomix --remote ${repoUrl}`;

  if (options.branch) {
    command += ` --branch ${options.branch}`;
  }
  if (options.path) {
    command += ` --path ${options.path}`;
  }

  return command;
}

async function ensureRepomixInstalled(silent = false): Promise<boolean> {
  try {
    await execAsync("repomix --version");
    return true;
  } catch {
    if (!silent) {
      console.log("Installing repomix...");
    }
    try {
      await execAsync("pnpm add  repomix");
      return true;
    } catch (error) {
      return false;
    }
  }
}

async function checkPrerequisites(): Promise<boolean> {
  try {
    await execAsync("pnpm --version");
    return true;
  } catch {
    console.error("pnpm is not installed. Please install pnpm first.");
    return false;
  }
}

function handleError(error: any): string {
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }
  return error.message || ERROR_MESSAGES.REPOMIXERROR;
}

async function runRepomix(
  repoUrl: string,
  options: RepomixOptions = {}
): Promise<RepomixResult> {
  try {
    // Validate repository URL
    if (!isValidGithubUrl(repoUrl)) {
      throw new Error(ERROR_MESSAGES.INVALIDREPO);
    }

    // // Check prerequisites
    // const prereqsMet = await checkPrerequisites();
    // if (!prereqsMet) {
    //   return {
    //     success: false,
    //     error: ERROR_MESSAGES.ENOENT,
    //   };
    // }

    // Ensure repomix is installed
    const repomixInstalled = await ensureRepomixInstalled(options.silent);
    if (!repomixInstalled) {
      return {
        success: false,
        error: "Failed to install repomix",
      };
    }

    // Build and execute command
    const command = buildCommand(repoUrl, options);
    const { stdout, stderr }: CommandOutput = await execAsync(command);

    // Handle output
    if (!options.silent) {
      if (stdout) console.log("Output:", stdout);
      if (stderr) console.error("Errors:", stderr);
    }

    return {
      success: true,
      output: stdout,
      error: stderr || undefined,
    };
  } catch (error) {
    const errorMessage = handleError(error);
    if (!options.silent) {
      console.error("Error executing repomix:", errorMessage);
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Export types and functions
export { runRepomix, checkPrerequisites };
