import nextra from "nextra"
import codeImport from "remark-code-import"
import path from "node:path"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [
      () =>
        codeImport({
          removeRedundantIndentations: true,
          rootDir: path.join(process.cwd(), "todo"),
        }),
    ],
  },
})

export default withNextra({
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
})
