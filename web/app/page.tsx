import { docs, meta } from "@/.source"
import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import { GithubStarButton } from "@/components/github-star-button"
import { useMemo } from "react"
import { formatDate } from "@/lib/utils"

const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

interface DocumentationData {
  title: string
  date: string
  version?: string
  tags?: string[]
  body: React.ComponentType
}

interface DocumentationPage {
  url: string
  data: DocumentationData
}

export default function HomePage() {
  const sortedDocs = useMemo(() => {
    const allPages = source.getPages() as DocumentationPage[]
    return allPages.sort((a, b) => {
      const dateA = new Date(a.data.date).getTime()
      const dateB = new Date(b.data.date).getTime()
      return dateB - dateA
    })
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-5xl mx-auto relative">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">
              no-push-oops
            </h1>
            <GithubStarButton />
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
        <div className="relative">
          {sortedDocs.map((doc) => {
            const MDX = doc.data.body

            return (
              <div key={doc.url} className="relative">
                <div className="flex flex-col md:flex-row gap-y-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="md:sticky md:top-20 pb-10 z-10">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {doc.data.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 md:pl-8 relative pb-10">
                    {/* Vertical timeline line */}
                    <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                    </div>

                    <div className="space-y-6">
                      {/* Tags */}
                      {doc.data.tags && doc.data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {doc.data.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                        <MDX />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
