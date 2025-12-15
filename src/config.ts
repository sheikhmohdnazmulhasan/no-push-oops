import * as fs from 'fs';
import * as path from 'path';
import { NoPushOopsConfig } from './types';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: NoPushOopsConfig = {
  command: 'npm run pr-preflight',
  message: 'Running pr-preflight checks before push',
  skipCI: true,
  verbose: false,
  timeout: 300000, // 5 minutes
};

/**
 * Load configuration from package.json or config file
 */
export const loadConfig = (cwd: string = process.cwd()): NoPushOopsConfig => {
  try {
    // Try loading from package.json
    const packageJsonPath = path.join(cwd, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      if (packageJson['no-push-oops']) {
        return { ...DEFAULT_CONFIG, ...packageJson['no-push-oops'] };
      }
    }

    // Try loading from .nopushoopsrc.json
    const rcPath = path.join(cwd, '.nopushoopsrc.json');
    if (fs.existsSync(rcPath)) {
      const rcConfig = JSON.parse(fs.readFileSync(rcPath, 'utf-8'));
      return { ...DEFAULT_CONFIG, ...rcConfig };
    }

    // Try loading from .nopushoopsrc
    const rcPathNoExt = path.join(cwd, '.nopushoopsrc');
    if (fs.existsSync(rcPathNoExt)) {
      const rcConfig = JSON.parse(fs.readFileSync(rcPathNoExt, 'utf-8'));
      return { ...DEFAULT_CONFIG, ...rcConfig };
    }
  } catch (error) {
    console.warn('Failed to load config, using defaults:', error);
  }

  return DEFAULT_CONFIG;
};

/**
 * Validate configuration
 */
export const validateConfig = (config: NoPushOopsConfig): boolean => {
  if (!config.command && (!config.commands || config.commands.length === 0)) {
    throw new Error('Either "command" or "commands" must be specified');
  }

  if (config.command && config.commands) {
    throw new Error('Cannot specify both "command" and "commands"');
  }

  return true;
};
