import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Check if running in CI environment
 */
export const isCI = (): boolean => {
  return !!(
    process.env.CI ||
    process.env.CONTINUOUS_INTEGRATION ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.CIRCLECI ||
    process.env.TRAVIS ||
    process.env.JENKINS_URL
  );
};

/**
 * Get the current Git branch name
 */
export const getCurrentBranch = (): string => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    return '';
  }
};

/**
 * Find the Git root directory
 */
export const findGitRoot = (startDir: string = process.cwd()): string | null => {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    const gitDir = path.join(currentDir, '.git');
    if (fs.existsSync(gitDir)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
};

/**
 * Check if a directory is a Git repository
 */
export const isGitRepo = (dir: string = process.cwd()): boolean => {
  return findGitRoot(dir) !== null;
};

/**
 * Format time duration in milliseconds to human-readable format
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
