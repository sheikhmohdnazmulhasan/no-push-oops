# Local Testing Guide

This guide explains how the `no-push-oops` package is currently set up for local testing in your main project.

## What Was Done

### 1. Built the Package

```bash
cd no-push-oops
npm install
npm run build
```

The package was built successfully, creating the `dist/` directory with compiled JavaScript.

### 2. Linked Globally

```bash
npm link
```

This created a global symlink to the local package.

### 3. Linked to Main Project

```bash
cd /home/sheikh/Int/zendolead-nextjs-app-2025
npm link no-push-oops
```

This created a symlink in your main project's `node_modules` pointing to the local package.

### 4. Configured the Main Project

Added to `package.json`:

```json
{
  "no-push-oops": {
    "command": "npm run pr-preflight",
    "message": "Running preflight checks before push",
    "skipCI": true,
    "timeout": 300000
  }
}
```

### 5. Excluded from Build Tools

To prevent the linked package from being checked by your tools:

**eslint.config.mjs:**
```javascript
ignores: ['...', 'no-push-oops/**']
```

**tsconfig.json:**
```json
"exclude": ["node_modules", "no-push-oops"]
```

**.prettierignore:**
```
no-push-oops
```

### 6. Installed the Hook

```bash
npx no-push-oops install
```

The pre-push hook is now active at `.git/hooks/pre-push`.

## How It Works

When you run `git push`, the hook will:

1. Run `npm run pr-preflight` (which runs lint, format, and typecheck)
2. If checks pass, allow the push
3. If checks fail, abort the push

## Testing Locally

### Manual Test

```bash
npx no-push-oops run
```

Expected output:
```
======== Running preflight checks before push ========

Running: npm run pr-preflight
[OK] Completed in 5s

======== Preflight checks passed. Proceeding with push ========
```

### Test with Real Push

```bash
git push origin main
```

The hook will run automatically before the push.

## Making Changes to no-push-oops

If you modify the package:

```bash
cd no-push-oops

# Make your changes to src/

# Rebuild
npm run build

# Test in main project
cd /home/sheikh/Int/zendolead-nextjs-app-2025
npx no-push-oops run
```

Changes are immediately available since it's linked!

## Uninstalling (When Done Testing)

### Remove Hook

```bash
cd /home/sheikh/Int/zendolead-nextjs-app-2025
npx no-push-oops uninstall
```

### Unlink Package

```bash
# In main project
npm unlink no-push-oops

# Globally
cd no-push-oops
npm unlink
```

## Publishing to npm (When Ready)

```bash
cd no-push-oops

# 1. Update version if needed
# Edit package.json version

# 2. Test everything
npm test
npm run lint
npm run build

# 3. Login to npm
npm login

# 4. Publish
npm publish

# 5. Install in main project normally
cd /home/sheikh/Int/zendolead-nextjs-app-2025
npm unlink no-push-oops
npm install --save-dev no-push-oops
```

## Current Status

- [x] Package built successfully
- [x] Linked globally
- [x] Linked to main project
- [x] Configured in package.json
- [x] Excluded from linting
- [x] Excluded from type-checking
- [x] Excluded from formatting
- [x] Hook installed
- [x] Manual test successful
- [x] Ready for real-world testing

## Next Steps

1. **Test with real pushes** - Try pushing to your repository
2. **Test failure scenarios** - Introduce lint/type errors and verify push is blocked
3. **Test bypass** - Try `git push --no-verify` to ensure it works
4. **Refine configuration** - Adjust timeout, messages, or commands as needed
5. **Publish when satisfied** - Follow publishing steps above

## Troubleshooting

### Hook not running

```bash
# Reinstall
npx no-push-oops install
```

### Changes not reflected

```bash
# Rebuild
cd no-push-oops
npm run build
```

### Want to test without CI skip

Temporarily change in `package.json`:
```json
"skipCI": false
```

Don't forget to change it back!

---

**The package is now ready for local testing!**
