import { promises as fs } from "fs"
import path from "path"

const main = async () => {
  const en = await walk("./pages/en")
  const fr = await walk("./pages/fr")

  const missingFiles = [...en]
    .map((file) => file.replace("/en/", "/fr/"))
    .filter((file) => !fr.includes(file))

  for (const file of missingFiles) {
    const dir = path.dirname(file)
    if (!(await exists(dir))) {
      fs.mkdir(dir, { recursive: true })
    }

    if (!(await exists(file))) {
      await fs.writeFile(
        "./" + file,
        generateFile(file.replace("/fr/", "/en/")),
      )
    }
  }
}

// https://gist.github.com/kethinov/6658166?permalink_comment_id=2733303#gistcomment-2733303
const walk = async (dir: string, filelist: string[] = []) => {
  const files = await fs.readdir(dir)

  for (const file of files) {
    const filepath = path.join(dir, file)
    const stat = await fs.stat(filepath)

    if (stat.isDirectory()) {
      filelist = await walk(filepath, filelist)
    } else {
      filelist.push(filepath)
    }
  }

  return filelist
}

const exists = async (dir: string) => {
  try {
    await fs.access(dir)
    return true
  } catch {
    return false
  }
}

const generateFile = (path: string) =>
  `export { default as default } from "${path.replace(".ts", "")}"\n`

main()
