import nextra from "nextra"
import codeImport from "remark-code-import"
import path from "node:path"
import remoteCode from "@forgen/remark-remote-code"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [
      () =>
        codeImport({
          removeRedundantIndentations: true,
          rootDir: path.join(process.cwd(), "examples"),
        }),
      () =>
        remoteCode({
          removeRedundantIndentations: true,
          rootDir: "https://github.com/forgen-org/todo/raw/main/",
        }),
    ],
  },
})

export default withNextra({
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
})
