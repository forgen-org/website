// import { useRouter } from "nextra/hooks"
import Link from "next/link"

export default function NotFound() {
  // TODO: I'm trying to redirect to the english version of the 404 page if the user is on the french version of the website.
  // const router = useRouter()

  // if (router.locale !== "en") {
  //   const path = "/en" + router.asPath.substring(3)
  //   const component = require(path).default
  //   router.replace(path)
  // }

  return (
    <section className="flex min-h-screen items-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl dark:text-blue-500">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}