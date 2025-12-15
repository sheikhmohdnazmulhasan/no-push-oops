import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { findGitRoot } from './utils';

/**
 * Pre-push hook template
 */
const PRE_PUSH_HOOK_TEMPLATE = `#!/bin/bash

# Pre-push hook installed by no-push-oops
# This hook runs preflight checks before allowing push

# Change to the repository root directory
cd "\${GIT_DIR}/.." || exit 1

# Run no-push-oops
npx --no-install no-push-oops-run

# Capture the exit code
EXIT_CODE=$?

# Exit with the captured code
exit $EXIT_CODE
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
    fs.writeFileSync(hookPath, PRE_PUSH_HOOK_TEMPLATE, { mode: 0o755 });

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
