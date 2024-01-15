import { GetServerSidePropsContext } from "next"

export async function redirectWithLocale(context: GetServerSidePropsContext) {
  const userLocales =
    context.req.headers["accept-language"]
      ?.split(",")
      .map((locale) => locale.substring(0, 2).toLowerCase()) ?? []
  const availableLocales = ["en", "fr"]

  const locale =
    userLocales.find((locale) => availableLocales.includes(locale)) ?? "en"

  return {
    redirect: {
      destination: `/${locale}`,
      permanent: false,
    },
  }
}
