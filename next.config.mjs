import nextra from "nextra"
import codeImport from "remark-code-import"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [
      () =>
        codeImport({
          removeRedundantIndentations: true,
          rootDir: "todo"
        })
    ]
  }
})

export default withNextra()
