/**
 * Configuration interface for no-push-oops
 */
export interface NoPushOopsConfig {
  /**
   * Command to run before push (e.g., "npm run pr-preflight")
   */
  command?: string;

  /**
   * Array of commands to run in sequence
   */
  commands?: string[];

  /**
   * Custom message to display when running checks
   */
  message?: string;

  /**
   * Skip the hook in CI environments
   * @default true
   */
  skipCI?: boolean;

  /**
   * Skip the hook for specific branches
   */
  skipOnBranches?: string[];

  /**
   * Enable verbose output
   * @default false
   */
  verbose?: boolean;

  /**
   * Timeout for commands in milliseconds
   * @default 300000 (5 minutes)
   */
  timeout?: number;
}

/**
 * Result of running a command
 */
export interface CommandResult {
  success: boolean;
  exitCode: number;
  command: string;
  output?: string;
  error?: string;
}
