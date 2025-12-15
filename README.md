# no-push-oops

> Prevent "oops" moments by running preflight checks before every Git push

A lightweight, configurable Git pre-push hook that automatically runs your quality checks (tests, linting, type-checking, etc.) before allowing a push to go through.

## Features

- **Zero Configuration** - Works out of the box with sensible defaults
- **Highly Configurable** - Customize commands, messages, and behavior
- **Auto-Installation** - Automatically sets up Git hooks on install
- **Beautiful Output** - Color-coded, clean terminal output
- **Timeout Support** - Prevent hung processes
- **Branch-Specific** - Skip checks on specific branches
- **CI-Aware** - Automatically skips in CI environments
- **TypeScript Support** - Fully typed for better DX

## Installation

```bash
npm install --save-dev no-push-oops
```

Or with yarn:

```bash
yarn add -D no-push-oops
```

Or with pnpm:

```bash
pnpm add -D no-push-oops
```

### Manual Hook Installation

If the hook isn't installed automatically:

```bash
npx no-push-oops install
```

## Quick Start

1. **Install the package:**

```bash
npm install --save-dev no-push-oops
```

2. **Add configuration to your `package.json`:**

```json
{
  "no-push-oops": {
    "command": "npm run pr-preflight"
  },
  "scripts": {
    "pr-preflight": "npm run lint && npm run test && npm run build"
  }
}
```

3. **That's it!** Now every time you push, your preflight checks will run automatically.

## Configuration

### Configuration File

You can configure `no-push-oops` in three ways:

1. **In `package.json`:**

```json
{
  "no-push-oops": {
    "command": "npm run pr-preflight",
    "message": "Running quality checks...",
    "skipCI": true,
    "skipOnBranches": ["main", "develop"],
    "verbose": false,
    "timeout": 300000
  }
}
```

2. **In `.nopushoopsrc.json`:**

```json
{
  "command": "npm run pr-preflight",
  "message": "Running quality checks...",
  "skipCI": true
}
```

3. **In `.nopushoopsrc`:**

```json
{
  "command": "npm run pr-preflight"
}
```

### Configuration Options

| Option           | Type       | Default                                     | Description                          |
| ---------------- | ---------- | ------------------------------------------- | ------------------------------------ |
| `command`        | `string`   | `"npm run pr-preflight"`                    | Single command to run                |
| `commands`       | `string[]` | -                                           | Multiple commands to run in sequence |
| `message`        | `string`   | `"Running pr-preflight checks before push"` | Custom message to display            |
| `skipCI`         | `boolean`  | `true`                                      | Skip checks in CI environments       |
| `skipOnBranches` | `string[]` | `[]`                                        | Branches to skip checks on           |
| `verbose`        | `boolean`  | `false`                                     | Show detailed output                 |
| `timeout`        | `number`   | `300000`                                    | Command timeout in milliseconds      |

### Multiple Commands

You can run multiple commands in sequence:

```json
{
  "no-push-oops": {
    "commands": ["npm run lint", "npm run test", "npm run type-check", "npm run build"]
  }
}
```

## Usage

### Automatic (Recommended)

Once installed, `no-push-oops` will automatically run on every `git push`. If the checks fail, the push will be aborted.

### Manual Run

You can manually run the checks:

```bash
npx no-push-oops run
```

### Bypass Hook (Emergency Only)

If you need to bypass the hook (not recommended):

```bash
git push --no-verify
```

### Uninstall

To remove the hook:

```bash
npx no-push-oops uninstall
```

## Common Use Cases

### Basic Linting and Testing

```json
{
  "no-push-oops": {
    "command": "npm run lint && npm run test"
  }
}
```

### Full CI Pipeline

```json
{
  "no-push-oops": {
    "commands": [
      "npm run lint",
      "npm run test:unit",
      "npm run test:integration",
      "npm run type-check",
      "npm run build"
    ],
    "message": "Running full CI pipeline...",
    "timeout": 600000
  }
}
```

### Skip on Main Branch

```json
{
  "no-push-oops": {
    "command": "npm run validate",
    "skipOnBranches": ["main", "master", "production"]
  }
}
```

### Verbose Mode for Debugging

```json
{
  "no-push-oops": {
    "command": "npm run test",
    "verbose": true
  }
}
```

## CLI Commands

```bash
# Install the pre-push hook
npx no-push-oops install

# Uninstall the pre-push hook
npx no-push-oops uninstall

# Run checks manually
npx no-push-oops run

# Show help
npx no-push-oops help
```

## Why no-push-oops?

**Problem:** You push code, CI fails, you fix it, push again, repeat...

**Solution:** Run your CI checks locally before pushing. Catch issues early!

### Benefits:

- **Catch issues before pushing** - Save time and embarrassment
- **Faster feedback** - Know immediately if something's wrong
- **Better Git history** - No "fix CI" commits
- **Team consistency** - Everyone runs the same checks
- **Easy to set up** - One npm install and you're done

## Comparison with Other Tools

| Feature          | no-push-oops | husky | pre-commit |
| ---------------- | ------------ | ----- | ---------- |
| Zero config      | Yes          | No    | No         |
| TypeScript       | Yes          | No    | No         |
| Pre-push focus   | Yes          | No    | No         |
| Auto-install     | Yes          | Yes   | Yes        |
| Branch filtering | Yes          | No    | Yes        |
| Timeout support  | Yes          | No    | Yes        |

## Example Projects

Check out these example configurations:

### TypeScript/React Project

```json
{
  "scripts": {
    "pr-preflight": "npm run lint && npm run type-check && npm run test && npm run build"
  },
  "no-push-oops": {
    "command": "npm run pr-preflight",
    "skipOnBranches": ["main"]
  }
}
```

### Node.js API

```json
{
  "scripts": {
    "pr-preflight": "npm run lint && npm run test:coverage && npm run build"
  },
  "no-push-oops": {
    "commands": [
      "npm run lint",
      "npm run test:coverage",
      "npm run security-check",
      "npm run build"
    ],
    "timeout": 600000
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Sheikh

## FAQ

### Q: What if I need to push urgently and checks are failing?

A: Use `git push --no-verify` to bypass the hook. But use this sparingly!

### Q: Can I run different checks on different branches?

A: Not directly, but you can skip checks on certain branches and implement branch logic in your scripts.

### Q: Does this work with GitLab/GitHub/Bitbucket?

A: Yes! It works with any Git repository.

### Q: What if the hook isn't running?

A: Run `npx no-push-oops install` manually to reinstall the hook.

### Q: Can I use this in a monorepo?

A: Yes! Install it at the root and configure commands accordingly.

## Links

- [GitHub Repository](https://github.com/yourusername/no-push-oops)
- [npm Package](https://www.npmjs.com/package/no-push-oops)
- [Report Issues](https://github.com/yourusername/no-push-oops/issues)

---

Made to prevent oops moments
