import type { Article, Author } from "components/Posts"

const Author: Record<string, Author> = {
  Alexandre: {
    name: "Alexandre Hanot",
    avatar: "https://avatars.githubusercontent.com/u/222164?v=4",
    github: "https://github.com/Almaju",
  },
  Alexis: {
    name: "Alexis Besson",
    avatar: "https://avatars.githubusercontent.com/u/20556405?v=4",
    github: "https://github.com/Lab3ss",
  },
}

export const articles = {
  podcast: {
    abstract:
      "A podcast in French about software engineering and the future of the Web.",
    author: Author.Alexandre,
    cover: "/blog/podcast/cover.png",
    date: new Date("2024-01-24"),
    title: "🇫🇷 Forgen Podcast",
  },
  "remark-remote-code": {
    abstract:
      "Enhance your Markdown files by dynamically importing code blocks from remote sources.",
    author: Author.Alexandre,
    cover: "/blog/remark-remote-code/cover.png",
    date: new Date("2024-01-23"),
    title: "@forgen/remark-remote-code",
  },
  "building-an-android-app-with-rust-using-uniffi": {
    abstract:
      "A comprehensive guide on integrating Rust code into an Adroid application using UniFFI, a tool that facilitates the creation of foreign function interfaces in Rust.",
    author: Author.Alexandre,
    cover: "/blog/building-an-android-app-with-rust-using-uniffi/cover.png",
    date: new Date("2024-01-22"),
    title: "Building an Android App with Rust Using UniFFI",
  },
  "building-an-ios-app-with-rust-using-uniffi": {
    abstract:
      "A comprehensive guide on integrating Rust code into an iOS application using UniFFI, a tool that facilitates the creation of foreign function interfaces in Rust.",
    author: Author.Alexandre,
    cover: "/blog/building-an-ios-app-with-rust-using-uniffi/cover.png",
    date: new Date("2024-01-22"),
    title: "Building an iOS App with Rust Using UniFFI",
  },
} satisfies Record<string, Article>

export default {
  "*": {
    theme: {
      layout: "default",
      typesetting: "article",
      pagination: true,
      toc: true,
    },
  },
  ...articles,
}
