import Image from "next/image"
import { useConfig, DocsThemeConfig } from "nextra-theme-docs"
import { Blog, Comments, Footer } from "./components"
import { useRouter } from "nextra/hooks"
import Link from "next/link"

const config: DocsThemeConfig = {
  feedback: {
    useLink: () => "https://discord.gg/73jbP8pVsr",
  },
  editLink: { component: () => null },

  // i18n
  i18n: [
    {
      locale: "en",
      name: "English",
    },
    {
      locale: "fr",
      name: "Français",
    },
  ],

  // Main theme
  head: function Head() {
    const config = useConfig()

    const title =
      config.filePath !== "pages/en/index.mdx" &&
      config.filePath !== "pages/fr/index.mdx"
        ? `${config.title} - Forgen`
        : "Forgen"

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={config.frontMatter.title ?? title} />
        <meta
          property="og:description"
          content={
            config.frontMatter.description ??
            "A craftsmanship approach of building web applications"
          }
        />
        <meta
          property="og:image"
          content={config.frontMatter.image ?? "/logo.png"}
        />
        {config.frontMatter.publishDate && (
          <meta
            property="og:publish_date"
            content={config.frontMatter.publishDate}
          />
        )}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <title>{title}</title>
      </>
    )
  },
  logo: function Logo() {
    const { locale } = useRouter()

    return (
      <div className="w-24">
        <Link href={`/${locale}`}>
          <Image src="/logo.png" height={24} width={24} alt="Forgen" />
        </Link>
      </div>
    )
  },
  logoLink: false,
  main: function Main(props: { children: React.ReactNode }) {
    const config = useConfig()

    if (config.filePath.match(/^pages\/([a-z]+)\/blog\/(?!index\.mdx$)(.+)$/)) {
      return (
        <div>
          <Blog.Cover />
          <Blog.Details />
          {props.children}
          <Comments />
        </div>
      )
    }

    return props.children
  },
  search: {
    placeholder: function Placeholder() {
      const { locale } = useRouter()
      switch (locale) {
        case "fr":
          return "Rechercher Forgen..."
        default:
          return "Search Forgen..."
      }
    },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: {
    component: <Footer />,
  },

  notFound: {
    content: function NotFound() {
      return "Hello"
    },
  },

  // External links
  chat: {
    link: "https://discord.gg/73jbP8pVsr",
  },
  project: {
    link: "https://github.com/forgen-org",
  },
}

export default config
