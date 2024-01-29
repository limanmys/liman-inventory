import { defineStore } from "pinia"
import { i18n } from "@/utils/i18n"
import http from "@/utils/http-common"
import type { IPackage } from "@/models/Package"
import type { IFilter, IPaginator } from "@limanmys/frontend-kit"

export const usePackageStore = defineStore({
  id: "package",
  state: () => ({
    filter: {} as IFilter,
    packages: {} as IPaginator<IPackage>,
  }),
  getters: {
    get: (state) => state.packages,
  },
  actions: {
    async fetch(payload: IFilter = {} as IFilter) {
      let q = payload
      if (Object.keys(payload).length < 1) {
        q = this.filter
      } else {
        this.filter = q
      }
      const query = new URLSearchParams(q as Record<string, string>).toString()

      return http.get(`packages/?${query}&sort=-count`).then((res) => {
        if (res.status == 200) {
          this.packages = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("package.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async report(file_type: string) {
      return http.get(`packages/report/${file_type}`).then((res) => {
        if (res.status == 200) {
          window.$notification.success({
            title: i18n.t("common.success"),
            content: i18n.t("report.create.messages.success"),
            duration: 3000,
          })
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("report.create.messages.error"),
            duration: 5000,
          })
        }
      })
    },
  },
})
