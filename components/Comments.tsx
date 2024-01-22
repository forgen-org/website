import { useEffect, useRef } from "react"

export const Comments = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")

    const script = document.createElement("script")
    script.async = true
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", "forgen-org/website")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("label", "blog-comment")
    script.setAttribute("theme", isDark ? "github-dark" : "github-light")
    script.setAttribute("crossorigin", "anonymous")

    if (ref && ref.current) {
      ref.current.appendChild(script)
    } else {
      console.log(`Error adding utterances comments on: ${ref}`)
    }
  }, [])

  return <div ref={ref} className="pt-10" />
}
