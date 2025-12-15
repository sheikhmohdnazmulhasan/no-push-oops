"use client"

import * as React from "react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_REPO = "sheikhmohdnazmulhasan/no-push-oops"

/**
 * GitHub Star Button Component
 * Displays a button that links to the GitHub repository with star count
 */
export const GithubStarButton = () => {
  const [stars, setStars] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setStars(data.stargazers_count)
        }
      } catch (error) {
        console.error("Failed to fetch star count:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStarCount()
  }, [])

  const formatStarCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <Button variant="outline" size="sm" asChild className="gap-2">
      <a
        href={`https://github.com/${GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <Github className="h-4 w-4" />
        {/* <span className="hidden sm:inline">GitHub</span> */}
        {!isLoading && stars !== null && (
          <span className="inline-flex items-center justify-center min-w-[2rem] h-5 px-2 text-xs font-medium bg-muted rounded-full">
            {formatStarCount(stars)}
          </span>
        )}
      </a>
    </Button>
  )
}
