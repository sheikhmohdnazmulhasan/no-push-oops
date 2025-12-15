export const siteConfig = {
  name: "no-push-oops",
  url: "https://no-push-oops.vercel.app",
  ogImage: "https://no-push-oops.vercel.app/og.png",
  description:
    "Prevent 'oops' moments by running preflight checks before every Git push. A lightweight, configurable Git pre-push hook that automatically runs tests, linting, and type-checking before allowing pushes.",
  links: {
    github: "https://github.com/sheikhmohdnazmulhasan/no-push-oops",
    npm: "https://www.npmjs.com/package/no-push-oops",
  },
  keywords: [
    "git",
    "git hooks",
    "pre-push",
    "pre-push hook",
    "preflight checks",
    "code quality",
    "ci/cd",
    "continuous integration",
    "testing",
    "linting",
    "type checking",
    "typescript",
    "javascript",
    "nodejs",
    "npm package",
    "developer tools",
    "devops",
    "git workflow",
    "quality assurance",
    "automated testing",
  ],
}

export interface SiteConfig {
  name: string
  url: string
  ogImage: string
  description: string
  links: {
    github: string
    npm: string
  }
  keywords: string[]
}

export type SiteConfigType = typeof siteConfig
