import { siteConfig } from "@/lib/site"

/**
 * JSON-LD structured data component for SEO
 * Provides search engines with structured information about the website
 */
export const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: "Sheikh Mohammad Nazmul Hasan",
      url: "https://github.com/sheikhmohdnazmulhasan",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    softwareVersion: "1.0",
    keywords: siteConfig.keywords.join(", "),
    codeRepository: siteConfig.links.github,
    discussionUrl: `${siteConfig.links.github}/discussions`,
    downloadUrl: siteConfig.links.npm,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: "TypeScript",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
