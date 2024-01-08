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
          rootDir: path.join(__dirname, "todo")
        })
    ]
  }
})

export default withNextra()
