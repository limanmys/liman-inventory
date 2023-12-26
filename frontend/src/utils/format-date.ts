import { format } from "date-fns"
import { tr, enUS } from "date-fns/locale"

const formatDate = (time: any) => {
  return format(new Date(time), "dd MMMM yyyy HH:mm", {
    locale: document.documentElement.lang == "tr" ? tr : enUS,
  })
}

const formatTimeObject = (timeObject: { [key: string]: number }) => {
  const lang = document.documentElement.lang
  const unitNames = {
    years: lang === "tr" ? "yıl" : "y",
    months: lang === "tr" ? "ay" : "m",
    days: lang === "tr" ? "gün" : "d",
    hours: lang === "tr" ? "sa" : "h",
    minutes: lang === "tr" ? "dk" : "m",
    seconds: lang === "tr" ? "sn" : "s",
  } as { [key: string]: string }
  const parts = []

  for (const key in timeObject) {
    if (
      Object.prototype.hasOwnProperty.call(timeObject, key) &&
      timeObject[key] > 0
    ) {
      const unitName = unitNames[key] || key
      const unit = timeObject[key] !== 1 ? unitName : unitName.slice(0, -1)
      parts.push(`${timeObject[key]}${unit}`)
    }
  }
  return parts.join(" ")
}

export { formatDate, formatTimeObject }
