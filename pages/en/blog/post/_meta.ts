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
  "how-not-to-panic-using-backtrace-in-rust": {
    abstract:
      "A podcast in French about software engineering and the future of the Web.",
    author: Author.Alexandre,
    cover: "/blog/how-not-to-panic-using-backtrace-in-rust/cover.webp",
    date: new Date("2024-02-20"),
    title: "How not to panic using `Backtrace` in Rust",
  },
  "why-i-switched-from-typescript-to-rust": {
    abstract:
      "After nearly a year of diving into Rust, transitioning from a TypeScript background, I can wholeheartedly say I have no regrets.",
    author: Author.Alexandre,
    cover: "/blog/why-i-switched-from-typescript-to-rust/cover.webp",
    date: new Date("2024-02-13"),
    title: "Why I switched from Typescript to Rust",
  },
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
