# Contributing to no-push-oops

First off, thank you for considering contributing to no-push-oops!

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node version, npm version
- **Configuration**: Your no-push-oops configuration

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use Case**: Explain the problem from a user's perspective
- **Proposed Solution**: Describe how you envision the feature working
- **Alternatives**: Alternative solutions you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Add tests** if you've added code that should be tested
4. **Update documentation** if you've changed APIs or added features
5. **Run the tests** to ensure everything passes
6. **Write a clear commit message** describing your changes

## Development Setup

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/no-push-oops.git
cd no-push-oops

# Install dependencies
npm install

# Build the project
npm run build

# Run in watch mode during development
npm run dev
```

### Project Structure

```
no-push-oops/
├── src/
│   ├── types.ts       # TypeScript type definitions
│   ├── config.ts      # Configuration loading and validation
│   ├── utils.ts       # Utility functions
│   ├── runner.ts      # Command execution logic
│   ├── installer.ts   # Hook installation logic
│   ├── cli.ts         # CLI entry point
│   └── index.ts       # Main export file
├── examples/          # Example configurations
├── scripts/           # Build and install scripts
└── dist/             # Compiled output (generated)
```

## Code Style

- **TypeScript**: All new code should be written in TypeScript
- **Formatting**: We use Prettier for code formatting
- **Linting**: We use ESLint for code quality
- **Comments**: Add JSDoc comments for public APIs
- **Arrow Functions**: Use arrow functions consistently
- **Named Exports**: Prefer named exports over default exports

### Running Code Quality Checks

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run build
```

## Testing

We use Jest for testing. All new features should include tests.

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- **Unit Tests**: Test individual functions in isolation
- **Integration Tests**: Test complete workflows
- **File Naming**: Use `.test.ts` suffix for test files
- **Coverage**: Aim for >80% code coverage

## Documentation

- Update README.md for user-facing changes
- Update JSDoc comments for API changes
- Add examples for new features
- Update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/)

## Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

## Commit Message Guidelines

Use clear and descriptive commit messages:

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat: add support for parallel command execution

fix: resolve timeout issues on slow networks

docs: update configuration examples in README
```

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes: `git commit -m "chore: release v1.2.3"`
4. Tag release: `git tag v1.2.3`
5. Push: `git push && git push --tags`
6. GitHub Actions will handle npm publishing

## Communication

- **Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Pull Requests**: For code contributions

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

- **Be Respectful**: Treat everyone with respect
- **Be Constructive**: Provide constructive feedback
- **Be Collaborative**: Work together towards common goals
- **Be Patient**: Help others learn and grow

## Good First Issues

Look for issues labeled `good-first-issue` - these are great starting points for new contributors!

## Questions?

Feel free to open an issue with the `question` label or start a discussion.

---

Thank you for contributing!
