import { ReactNode } from "react"
import { ChildrenFind, useFind } from "../hooks"
import Image from "next/image"
import Link from "next/link"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import clsx from "clsx"

type HeroProps = {
  cta?: {
    href: string
    children: string
  }
  children?: ReactNode
  heading?: string
  img?: {
    src: StaticImport
    alt: string
  }
  rawImg?: boolean
  right?: boolean
  subheading?: string
  top?: boolean
}

export const Hero = (props: HeroProps) => {
  const find = useFind(props.children)
  props = { ...props, ...parseProps(find) }

  const align = props.right ? "right" : props.top ? "top" : "left"

  const renderImg = () =>
    props.img && (
      <div className="relative flex w-full justify-center">
        <Image
          src={props.img.src}
          alt={props.img.alt}
          className={clsx(
            "w-full",
            props.rawImg
              ? "max-h-60 object-contain"
              : "max-h-72 rounded-lg object-cover shadow-xl dark:bg-gray-700 dark:bg-gray-800",
          )}
          priority
        />
      </div>
    )

  return (
    <section>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
        {align === "top" && <div className={"col-span-12"}>{renderImg()}</div>}
        {align === "right" && (
          <div className={"hidden lg:col-span-5 lg:mt-0 lg:flex"}>
            {renderImg()}
          </div>
        )}
        <div
          className={clsx(
            "place-self-center",
            align === "top" ? "text-center lg:col-span-12" : "lg:col-span-7",
          )}
        >
          <h1
            className={clsx(
              "mb-4 max-w-2xl font-extrabold leading-none tracking-tight dark:text-white",
              align === "top"
                ? "mt-4 text-6xl"
                : "text-3xl md:text-4xl xl:text-5xl",
            )}
          >
            {props.heading}
          </h1>
          <p
            className={clsx(
              "mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 dark:text-gray-400",
              align === "top" ? "lg:text-3xl" : "lg:text-xl",
            )}
          >
            {props.subheading}
          </p>
          {props.cta && (
            <Link
              href={props.cta.href}
              className="mr-3 inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              {props.cta.children}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
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
          )}
        </div>
        {align === "left" && (
          <div className={"hidden lg:col-span-5 lg:mt-0 lg:block"}>
            {renderImg()}
          </div>
        )}
      </div>
    </section>
  )
}

const parseProps = (find: () => ChildrenFind): HeroProps => {
  const heading =
    find().whereName("h1").value() ??
    find().whereName("").value() ?? // In build, the name is empty ## Heading
    find().whereName("Heading").value() // In dev, the name is Heading for ## Heading
  const subheading = find().whereName("p").whereChildrenIsString().value()
  const img = find().whereName("img").props<{
    src: StaticImport
    alt: string
  }>()
  const cta = find().whereName("Link").props<{
    href: string
    children: string
  }>()

  return {
    cta,
    heading,
    img,
    subheading,
  }
}
