import type { Article, Author } from "components/Posts"

const Author: Record<string, Author> = {
  Alexandre: {
    name: "Alexandre Hanot",
    avatar: "https://avatars.githubusercontent.com/u/222164?v=4",
    github: "https://github.com/Almaju",
  },
}

export const articles: Record<string, Article> = {
  "2019-09-20-9_best_practices": {
    abstract:
      "A huge part of writing good code is about making it practical, understandable, shareable. Who never dug into an old code stack and felt like “Was this written by a monkey?”. Spoiler alert, you were that...",
    author: Author.Alexandre,
    cover: "/blog/2019-09-20-9_best_practices/cover.webp",
    date: new Date("2019-09-20"),
    title: "9 best practices I learned from React/Node in 2019",
  },
}

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
