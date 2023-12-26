import trTR from "@/localization/naive/trTR.js"
import dateTR from "@/localization/naive/dateTR.js"
import { enUS, dateEnUS } from "naive-ui"

const currentLocale = document.documentElement.lang
let locale, date

switch (currentLocale) {
  case "tr":
  default:
    locale = trTR
    date = dateTR
    break
  case "en":
    locale = enUS
    date = dateEnUS
    break
}

export { locale, date }
