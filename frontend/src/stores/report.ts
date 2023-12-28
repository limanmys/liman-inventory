import type { IFilter } from "@/models/Filter"
import type { IReport } from "@/models/Report"
import type { IPaginator } from "@/models/Paginator"
import http from "@/utils/http-common"
import { i18n } from "@/utils/i18n"
import { defineStore } from "pinia"

export const useReportStore = defineStore({
  id: "report",
  state: () => ({
    filter: {} as IFilter,
    reports: {} as IPaginator<IReport>,
  }),
  getters: {
    get: (state) => state.reports,
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
      return http.get(`jobs/?${query}`).then((res) => {
        if (res.status == 200) {
          this.reports = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("report.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
  },
})
