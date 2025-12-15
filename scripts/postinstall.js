#!/usr/bin/env node

/**
 * Post-install script to automatically install the Git hook
 * This runs after npm install
 */

const { installHook } = require('../dist/installer');
const chalk = require('chalk');

// Only run in user projects, not when developing the package itself
const isUserInstall =
  process.env.npm_config_global !== 'true' &&
  !process.env.npm_package_name?.includes('no-push-oops');

if (isUserInstall) {
  console.log(chalk.cyan('\nno-push-oops: Setting up pre-push hook...\n'));

  try {
    const success = installHook();
    if (success) {
      console.log(chalk.green('\nno-push-oops is ready to prevent oops moments!\n'));
      console.log(chalk.gray('Configure in package.json under "no-push-oops" key'));
      console.log(chalk.gray('Run "npx no-push-oops help" for more info\n'));
    }
  } catch (error) {
    console.log(
      chalk.yellow('\nCould not auto-install hook. Run manually: npx no-push-oops install\n')
    );
  }
} else {
  console.log(chalk.gray('Skipping hook installation (development mode)'));
}
