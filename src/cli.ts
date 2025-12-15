#!/usr/bin/env node

import chalk from 'chalk';
import { installHook, uninstallHook } from './installer';
import { loadConfig, validateConfig } from './config';
import { runPreflightChecks } from './runner';
import { isCI, getCurrentBranch } from './utils';

/**
 * Display help information
 */
const showHelp = (): void => {
  console.log(`
${chalk.cyan.bold('no-push-oops')} - Prevent oops moments with Git pre-push checks

${chalk.yellow('Usage:')}
  no-push-oops install    Install the pre-push hook
  no-push-oops uninstall  Uninstall the pre-push hook
  no-push-oops run        Run the preflight checks manually
  no-push-oops help       Show this help message

${chalk.yellow('Configuration:')}
  Add configuration to your package.json:

  ${chalk.gray('"no-push-oops": {')}
  ${chalk.gray('  "command": "npm run pr-preflight",')}
  ${chalk.gray('  "message": "Running quality checks...",')}
  ${chalk.gray('  "skipCI": true,')}
  ${chalk.gray('  "skipOnBranches": ["main", "develop"],')}
  ${chalk.gray('  "verbose": false,')}
  ${chalk.gray('  "timeout": 300000')}
  ${chalk.gray('}')}

  Or create a .nopushoopsrc.json file with the same structure.

${chalk.yellow('Examples:')}
  ${chalk.gray('# Install in current repo')}
  npx no-push-oops install

  ${chalk.gray('# Run checks manually')}
  npx no-push-oops run

${chalk.yellow('More info:')}
  https://github.com/yourusername/no-push-oops
`);
};

/**
 * Run the preflight checks
 */
const run = async (): Promise<void> => {
  const config = loadConfig();

  // Skip in CI if configured
  if (config.skipCI && isCI()) {
    console.log(chalk.yellow('Skipping pre-push checks in CI environment'));
    process.exit(0);
  }

  // Skip on specific branches if configured
  if (config.skipOnBranches && config.skipOnBranches.length > 0) {
    const currentBranch = getCurrentBranch();
    if (currentBranch && config.skipOnBranches.includes(currentBranch)) {
      console.log(chalk.yellow(`Skipping pre-push checks on branch: ${currentBranch}`));
      process.exit(0);
    }
  }

  // Validate configuration
  try {
    validateConfig(config);
  } catch (error) {
    console.error(chalk.red('Configuration error:'), error);
    process.exit(1);
  }

  // Run checks
  const success = await runPreflightChecks(config);
  process.exit(success ? 0 : 1);
};

/**
 * Main CLI entry point
 */
const main = async (): Promise<void> => {
  const args = process.argv.slice(2);

  // If called as 'no-push-oops-run', automatically run checks
  const scriptName = process.argv[1];
  const isRunCommand = scriptName && scriptName.includes('no-push-oops-run');
  const command = isRunCommand && !args[0] ? 'run' : args[0];

  switch (command) {
    case 'install': {
      const installSuccess = installHook();
      process.exit(installSuccess ? 0 : 1);
      break;
    }

    case 'uninstall': {
      const uninstallSuccess = uninstallHook();
      process.exit(uninstallSuccess ? 0 : 1);
      break;
    }

    case 'run':
      await run();
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      process.exit(0);
      break;

    default:
      if (!command) {
        showHelp();
      } else {
        console.error(chalk.red(`Unknown command: ${command}`));
        console.log('Run "no-push-oops help" for usage information');
      }
      process.exit(1);
  }
};

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught error:'), error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(chalk.red('Unhandled rejection:'), error);
  process.exit(1);
});

// Run the CLI
main().catch((error) => {
  console.error(chalk.red('Error:'), error);
  process.exit(1);
});
