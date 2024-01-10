import Image from "next/image"
import Link from "next/link"
import { useConfig } from "nextra-theme-docs"
import { Item } from "nextra/normalize-pages"

export type Article = {
  abstract: string
  author: Author
  cover: string
  date: Date
  title: string
}

export type Author = {
  name: string
  avatar: string
  github: string
}

export type ItemArticle = Item & Article

export const List = () => {
  const config = useConfig()
  const items =
    (config.normalizePagesResult.activePath.at(0)?.children?.at(1)
      ?.children as ItemArticle[]) ?? []

  return (
    <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.route} {...item} />
      ))}
    </div>
  )
}

const Card = (props: ItemArticle) => (
  <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="relative my-2 h-56 rounded-lg bg-gray-100 shadow-xl dark:bg-gray-700 dark:bg-gray-800">
      <Link href={props.route}>
        <Image
          alt={props.title}
          className="rounded-lg object-cover"
          fill
          priority
          sizes="100vw"
          src={props.cover}
        />
      </Link>
    </div>
    <div className="mb-5 flex items-center justify-between text-gray-500">
      <Link href={props.route}>
        <span className="text-sm">{formatDate(props.date)}</span>
      </Link>
    </div>
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <Link href={props.route}>{props.title}</Link>
    </h2>
    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
      <Link href={props.route}>{props.abstract}</Link>
    </p>
    <div className="flex items-center justify-between">
      <Link href={props.author.github}>
        <div className="flex items-center space-x-4">
          <Image
            alt={props.author.name}
            className="h-7 w-7 rounded-full"
            height={28}
            src={props.author.avatar}
            width={28}
          />
          <span className="font-medium dark:text-white">
            {props.author.name}
          </span>
        </div>
      </Link>
      <Link
        href={props.route}
        className="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
      >
        Read more
        <svg
          className="ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  </article>
)

export const Cover = () => {
  const config = useConfig()
  const current = config.normalizePagesResult.activePath.at(-1) as ItemArticle

  return (
    <div className="my-6 flex justify-center">
      <div className="relative w-3/4">
        <Image
          alt={current.title}
          className="rounded-lg object-scale-down shadow-xl dark:bg-gray-700 dark:bg-gray-800"
          height={0}
          priority
          sizes="100vw"
          src={current.cover}
          style={{ width: "100%", height: "auto" }}
          width={0}
        />
      </div>
    </div>
  )
}

export const Details = () => {
  const config = useConfig()
  const current = config.normalizePagesResult.activePath.at(-1) as ItemArticle

  return (
    <header className="not-format mb-4 lg:mb-6">
      <address className="mb-6 flex items-center not-italic">
        <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
          <Image
            alt={current.author.name}
            className="mr-4 h-10 w-10 rounded-full"
            height={40}
            src={current.author.avatar}
            width={40}
          />
          <div>
            <Link
              href={current.author.github}
              rel="author"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {current.author.name}
            </Link>
            <p className="text-base text-gray-500 dark:text-gray-400">
              <time
                dateTime={current.date.toString()}
                title={formatDate(current.date)}
              >
                {formatDate(current.date)}
              </time>
            </p>
          </div>
        </div>
      </address>
    </header>
  )
}

const formatDate = (from: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(from)

export const Blog = {
  Cover,
  Details,
  List,
}
