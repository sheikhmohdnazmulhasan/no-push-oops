import { spawn } from 'child_process';
import chalk from 'chalk';
import { CommandResult, NoPushOopsConfig } from './types';
import { formatDuration } from './utils';

/**
 * Run a single command and return the result
 */
export const runCommand = async ({
  command,
  timeout,
  verbose,
}: {
  command: string;
  timeout?: number;
  verbose?: boolean;
}): Promise<CommandResult> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let output = '';
    let errorOutput = '';

    console.log(chalk.blue(`Running: ${command}`));

    // Use shell to properly handle command parsing (cross-platform)
    const child = spawn(command, {
      shell: true,
      stdio: verbose ? 'inherit' : 'pipe',
    });

    if (!verbose && child.stdout) {
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
    }

    if (!verbose && child.stderr) {
      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
    }

    // Handle timeout
    const timeoutId = timeout
      ? setTimeout(() => {
          child.kill();
          resolve({
            success: false,
            exitCode: -1,
            command,
            error: `Command timed out after ${formatDuration(timeout)}`,
          });
        }, timeout)
      : null;

    child.on('close', (code) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const duration = Date.now() - startTime;
      const exitCode = code ?? -1;
      const success = exitCode === 0;

      if (success) {
        console.log(chalk.green(`[OK] Completed in ${formatDuration(duration)}`));
      } else {
        console.log(chalk.red(`[FAIL] Failed with exit code ${exitCode}`));
        if (!verbose && errorOutput) {
          console.log(chalk.red(errorOutput));
        }
      }

      resolve({
        success,
        exitCode,
        command,
        output: verbose ? undefined : output,
        error: verbose ? undefined : errorOutput,
      });
    });

    child.on('error', (err) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      resolve({
        success: false,
        exitCode: -1,
        command,
        error: err.message,
      });
    });
  });
};

/**
 * Run preflight checks based on configuration
 */
export const runPreflightChecks = async (config: NoPushOopsConfig): Promise<boolean> => {
  console.log(
    chalk.cyan.bold('\n======== ' + (config.message || 'Running preflight checks') + ' ========\n')
  );

  const commands = config.commands || (config.command ? [config.command] : []);
  let allSucceeded = true;

  for (const command of commands) {
    const result = await runCommand({
      command,
      timeout: config.timeout,
      verbose: config.verbose,
    });

    if (!result.success) {
      allSucceeded = false;
      break;
    }
  }

  console.log('');

  if (allSucceeded) {
    console.log(
      chalk.green.bold('======== Preflight checks passed. Proceeding with push ========')
    );
  } else {
    console.log(chalk.red.bold('======== Preflight checks failed. Push aborted ========'));
    console.log(chalk.yellow('Please fix the issues above and try again.'));
  }

  return allSucceeded;
};
