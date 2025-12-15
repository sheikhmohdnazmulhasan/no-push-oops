# Publishing Guide

## Pre-Publish Checklist

Before publishing to npm, ensure everything is ready:

```bash
cd no-push-oops

# Run all checks
npm install
npm run build
npm run lint
npm test
```

## Publishing Steps

### 1. Update Version (if needed)

Edit `package.json` and update the version following semantic versioning:

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backwards compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

### 2. Update Package Metadata

Before publishing, update these in `package.json`:

- [ ] `author` - Your name/email
- [ ] `repository.url` - Your GitHub repository URL
- [ ] `bugs.url` - Your GitHub issues URL
- [ ] `homepage` - Your GitHub repo homepage

Find and replace `yourusername` with your actual GitHub username in:

- package.json
- README.md
- All documentation files

### 3. Login to npm

```bash
npm login
```

Enter your npm credentials.

### 4. Publish

```bash
# Dry run first to see what will be published
npm publish --dry-run

# Actually publish
npm publish
```

### 5. Verify Publication

Check on npm:

```
https://www.npmjs.com/package/no-push-oops
```

## Installing in Your Main Project

### 1. Remove Local Link

```bash
cd /home/sheikh/Int/zendolead-nextjs-app-2025

# Unlink local version
npm unlink no-push-oops

# Remove the no-push-oops folder
rm -rf no-push-oops
```

### 2. Install from npm

```bash
npm install --save-dev no-push-oops
```

The package will auto-install the Git hook via the postinstall script!

### 3. Verify Installation

```bash
# Check if hook is installed
ls -la .git/hooks/pre-push

# Test manually
npx no-push-oops run

# Check configuration
cat package.json | grep -A 5 "no-push-oops"
```

## What's Already Configured

Your `package.json` already has the configuration:

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

**No changes needed!** This configuration will work with the published package.

## Testing After Installation

### 1. Manual Test

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

### 2. Test with Real Push

```bash
# Make a change
echo "test" >> README.md

# Commit
git add README.md
git commit -m "test: verify pre-push hook"

# Push - hook will run automatically!
git push origin main
```

### 3. Test Failure Scenario

```bash
# Introduce a lint error in a file
# Try to push
# It should block the push
```

### 4. Test Bypass

```bash
# Emergency bypass (use sparingly!)
git push --no-verify
```

## What Happens After npm install

1. **Package installed** to `node_modules/no-push-oops`
2. **Postinstall script runs** automatically
3. **Git hook created** at `.git/hooks/pre-push`
4. **Ready to use** - no additional configuration needed!

## Summary

After publishing and installing from npm:

- ✅ Configuration in package.json stays the same
- ✅ No exclusions needed (package is in node_modules)
- ✅ Hook auto-installs on npm install
- ✅ Works exactly like during local testing
- ✅ No code changes required in main project

## Troubleshooting

### Hook not installed after npm install

```bash
npx no-push-oops install
```

### Want to see help

```bash
npx no-push-oops help
```

### Uninstall hook

```bash
npx no-push-oops uninstall
```

---

**Ready to publish!** Follow the steps above and you're good to go.
