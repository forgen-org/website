import Image from "next/image"

const config = {
  // Main theme
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Forgen" />
      <meta
        property="og:description"
        content="A craftmanship approach of building web applications"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </>
  ),
  logo: (
    <div className="w-24">
      <Image src="/logo.png" height={24} width={24} alt="Forgen" />
    </div>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    text: null
  },

  // External links
  chat: {
    link: "https://discord.gg/6fTK3ssg"
  },
  project: {
    link: "https://github.com/forgen-org"
  }
}

export default config
