import { ReactNode } from "react"

export const Highlight = (props: { children: ReactNode }) => (
  <span className="font-bold text-pink-500">{props.children}</span>
)
