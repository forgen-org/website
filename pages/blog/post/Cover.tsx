import Image from "next/image"
import { useConfig } from "nextra-theme-docs"
import { Item } from "nextra/normalize-pages"
import { Article } from "./_meta"

export const Cover = () => {
  const config = useConfig()
  const current = config.normalizePagesResult.activePath.at(-1) as Item &
    Article

  return (
    <div className="my-6 flex  justify-center">
      <div className="relative w-3/4">
        <Image
          alt={current.title}
          className="rounded-lg object-scale-down shadow-xl dark:bg-gray-700 dark:bg-gray-800"
          height={0}
          priority={false}
          sizes="100vw"
          src={current.cover}
          style={{ width: "100%", height: "auto" }}
          width={0}
        />
      </div>
    </div>
  )
}
