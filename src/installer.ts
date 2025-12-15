import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { findGitRoot } from './utils';

/**
 * Pre-push hook template (Node.js for cross-platform compatibility)
 */
const PRE_PUSH_HOOK_TEMPLATE = `#!/usr/bin/env node

// Pre-push hook installed by no-push-oops
// This hook runs preflight checks before allowing push

const { execSync } = require('child_process');
const { join } = require('path');

try {
  // Get the repository root directory
  const repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
  
  // Change to repository root
  process.chdir(repoRoot);
  
  // Find and run the CLI from node_modules (cross-platform)
  const cliPath = join(process.cwd(), 'node_modules', 'no-push-oops', 'dist', 'cli.js');
  require(cliPath);
} catch (error) {
  console.error('Pre-push hook failed:', error.message);
  process.exit(1);
}
`;

/**
 * Install the pre-push hook in the Git repository
 */
export const installHook = (projectRoot?: string): boolean => {
  try {
    const cwd = projectRoot || process.cwd();
    const gitRoot = findGitRoot(cwd);

    if (!gitRoot) {
      console.error(chalk.red('Error: Not a Git repository'));
      return false;
    }

    const hooksDir = path.join(gitRoot, '.git', 'hooks');
    const hookPath = path.join(hooksDir, 'pre-push');

    // Create hooks directory if it doesn't exist
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Check if hook already exists
    if (fs.existsSync(hookPath)) {
      const existingHook = fs.readFileSync(hookPath, 'utf-8');
      if (existingHook.includes('no-push-oops')) {
        console.log(chalk.yellow('Pre-push hook already installed'));
        return true;
      }

      // Backup existing hook
      const backupPath = `${hookPath}.backup-${Date.now()}`;
      fs.copyFileSync(hookPath, backupPath);
      console.log(chalk.yellow(`Existing hook backed up to: ${path.relative(cwd, backupPath)}`));
    }

    // Write the hook
    fs.writeFileSync(hookPath, PRE_PUSH_HOOK_TEMPLATE);

    // Set executable permission (works on Unix-like systems, safe to ignore on Windows)
    try {
      fs.chmodSync(hookPath, 0o755);
    } catch (error) {
      // Ignore chmod errors on Windows - Git handles hook execution differently
    }

    console.log(chalk.green('[OK] Pre-push hook installed successfully!'));
    console.log(chalk.gray(`  Location: ${path.relative(cwd, hookPath)}`));

    return true;
  } catch (error) {
    console.error(chalk.red('Error installing hook:'), error);
    return false;
  }
};

/**
 * Uninstall the pre-push hook
 */
export const uninstallHook = (projectRoot?: string): boolean => {
  try {
    const cwd = projectRoot || process.cwd();
    const gitRoot = findGitRoot(cwd);

    if (!gitRoot) {
      console.error(chalk.red('Error: Not a Git repository'));
      return false;
    }

    const hookPath = path.join(gitRoot, '.git', 'hooks', 'pre-push');

    if (!fs.existsSync(hookPath)) {
      console.log(chalk.yellow('Pre-push hook not found'));
      return true;
    }

    const hookContent = fs.readFileSync(hookPath, 'utf-8');
    if (!hookContent.includes('no-push-oops')) {
      console.log(chalk.yellow('Pre-push hook is not from no-push-oops'));
      return false;
    }

    fs.unlinkSync(hookPath);
    console.log(chalk.green('[OK] Pre-push hook uninstalled successfully'));

    return true;
  } catch (error) {
    console.error(chalk.red('Error uninstalling hook:'), error);
    return false;
  }
};
