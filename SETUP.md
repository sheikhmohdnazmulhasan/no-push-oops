# Development Setup

Complete guide to set up **no-push-oops** for development.

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0 or yarn >= 1.22.0
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/no-push-oops.git
cd no-push-oops
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including TypeScript, Jest, ESLint, and more.

### 3. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 4. Run in Development Mode

```bash
npm run dev
```

This runs TypeScript compiler in watch mode - changes are automatically recompiled.

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

Coverage reports will be generated in the `coverage/` directory.

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Local Testing

To test the package locally in another project:

### Method 1: npm link

In the no-push-oops directory:

```bash
npm run build
npm link
```

In your test project:

```bash
npm link no-push-oops
```

### Method 2: Local Install

```bash
npm install /path/to/no-push-oops
```

### Method 3: Pack and Install

```bash
# In no-push-oops directory
npm pack

# In test project
npm install /path/to/no-push-oops/no-push-oops-1.0.0.tgz
```

## Project Structure

```
no-push-oops/
├── .github/
│   ├── workflows/
│   │   └── ci.yml              # GitHub Actions CI/CD
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md       # Bug report template
│       └── feature_request.md  # Feature request template
├── examples/
│   ├── basic.json              # Basic configuration example
│   └── advanced.json           # Advanced configuration example
├── scripts/
│   └── postinstall.js          # Post-install hook setup
├── src/
│   ├── __tests__/
│   │   └── utils.test.ts       # Unit tests
│   ├── cli.ts                  # CLI entry point
│   ├── config.ts               # Configuration management
│   ├── index.ts                # Main exports
│   ├── installer.ts            # Hook installation logic
│   ├── runner.ts               # Command execution
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
├── .editorconfig               # Editor configuration
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .npmignore                  # npm ignore rules
├── .nvmrc                      # Node version specification
├── .prettierrc                 # Prettier configuration
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guidelines
├── jest.config.js              # Jest configuration
├── LICENSE                     # MIT License
├── package.json                # Package manifest
├── QUICK_START.md              # Quick start guide
├── README.md                   # Main documentation
├── SETUP.md                    # This file
└── tsconfig.json               # TypeScript configuration
```

## Debugging

### Enable Verbose Mode

When testing, use verbose mode to see detailed output:

```json
{
  "no-push-oops": {
    "command": "npm run test",
    "verbose": true
  }
}
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/cli.ts",
      "args": ["run"],
      "runtimeArgs": ["-r", "ts-node/register"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

## Making Changes

1. **Create a branch:**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**

3. **Test your changes:**

   ```bash
   npm run build
   npm test
   npm run lint
   ```

4. **Commit your changes:**

   ```bash
   git commit -m "feat: add my feature"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/my-feature
   ```

## Publishing (Maintainers Only)

### Manual Publish

```bash
# Ensure tests pass
npm test

# Update version
npm version [major|minor|patch]

# Build
npm run build

# Publish
npm publish
```

### Automated Publish

Push a tag to trigger automatic publishing:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will automatically publish to npm.

## Common Issues

### Issue: "Cannot find module 'chalk'"

**Solution:** Rebuild the project

```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Hook not installing

**Solution:** Check Git repository

```bash
# Ensure you're in a Git repository
git status

# Try manual installation
npx no-push-oops install
```

### Issue: TypeScript errors

**Solution:** Clean and rebuild

```bash
rm -rf dist
npm run build
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

## Getting Help

- Check existing [Issues](https://github.com/yourusername/no-push-oops/issues)
- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Start a [Discussion](https://github.com/yourusername/no-push-oops/discussions)

---

Happy coding!
