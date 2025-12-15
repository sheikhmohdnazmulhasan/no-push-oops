# Quick Start Guide

Get up and running with **no-push-oops** in 5 minutes!

## Step 1: Install

```bash
npm install --save-dev no-push-oops
```

The Git hook will be automatically installed!

## Step 2: Configure

Add to your `package.json`:

```json
{
  "scripts": {
    "pr-preflight": "npm run lint && npm run test && npm run build"
  },
  "no-push-oops": {
    "command": "npm run pr-preflight"
  }
}
```

Or create `.nopushoopsrc.json`:

```json
{
  "command": "npm run pr-preflight",
  "message": "Running quality checks..."
}
```

## Step 3: Push!

That's it! Now whenever you `git push`, your checks will run automatically:

```bash
git push origin feature/my-branch
```

Output:

```
======== Running pr-preflight checks before push ========

Running: npm run pr-preflight
Completed in 15s

======== Preflight checks passed. Proceeding with push ========
```

## Common Configurations

### TypeScript Project

```json
{
  "no-push-oops": {
    "commands": ["npm run lint", "npm run type-check", "npm run test", "npm run build"]
  }
}
```

### Skip on Main Branch

```json
{
  "no-push-oops": {
    "command": "npm run validate",
    "skipOnBranches": ["main", "master"]
  }
}
```

### Fast Mode (Lint Only)

```json
{
  "no-push-oops": {
    "command": "npm run lint",
    "timeout": 30000
  }
}
```

## Manual Commands

```bash
# Install hook manually
npx no-push-oops install

# Run checks manually
npx no-push-oops run

# Uninstall
npx no-push-oops uninstall

# Get help
npx no-push-oops help
```

## Emergency Bypass

If you absolutely need to push without checks:

```bash
git push --no-verify
```

Use sparingly!

## Next Steps

- Read the full [README.md](./README.md)
- Check [examples](./examples/)
- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

---

**Happy coding without oops moments!**
