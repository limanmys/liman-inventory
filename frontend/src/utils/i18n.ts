import { createI18n } from "vue-i18n"

import tr from "@/localization/tr.json"
import en from "@/localization/en.json"

const instance = createI18n({
  legacy: false,
  locale: document.documentElement.lang,
  globalInjection: true,
  fallbackLocale: "en",
  messages: {
    tr: {
      ...tr,
    },
    en: {
      ...en,
    },
  },
})

export default instance

export const i18n = instance.global
