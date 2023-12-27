import { defineStore } from "pinia"
import http from "@/utils/http-common"
import { i18n } from "@/utils/i18n"
import type { IFilter } from "@/models/Filter"
import type { IPaginator } from "@/models/Paginator"
import type { IDiscovery, IDiscoveryCreate } from "@/models/Discovery"

export const useDiscoveryStore = defineStore({
  id: "discovery",
  state: () => ({
    filter: {} as IFilter,
    discoveries: {} as IPaginator<IDiscovery>,
  }),
  getters: {
    get: (state) => state.discoveries,
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

      return http.get(`discoveries/?${query}`).then((res) => {
        if (res.status == 200) {
          this.discoveries = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("discovery.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async create(payload: IDiscoveryCreate) {
      return http
        .post(`discoveries`, {
          data: JSON.stringify(payload),
        })
        .then((res) => {
          if (res.status == 200) {
            window.$notification.success({
              title: i18n.t("common.success"),
              content: i18n.t("discovery.create.messages.success"),
              duration: 3000,
            })
            this.fetch()
          } else {
            window.$notification.error({
              title: i18n.t("common.error"),
              content: i18n.t("discovery.create.messages.error"),
              duration: 5000,
            })
          }
        })
    },
    async run(id: string) {
      return http.post(`discoveries/${id}`).then((res) => {
        if (res.status == 200) {
          window.$notification.success({
            title: i18n.t("common.success"),
            content: i18n.t("discovery.run.messages.success"),
            duration: 3000,
          })
          this.fetch()
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("discovery.run.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async delete(id: string) {
      window.$dialog.warning({
        title: i18n.t("common.warning"),
        content: i18n.t("common.are_you_sure"),
        positiveText: i18n.t("common.yes"),
        negativeText: i18n.t("common.no"),
        onPositiveClick: () => {
          return http.delete(`discoveries/${id}`).then((res) => {
            if (res.status == 200) {
              window.$notification.success({
                title: i18n.t("common.success"),
                content: i18n.t("discovery.delete.messages.success"),
                duration: 3000,
              })
              this.fetch()
            } else {
              window.$notification.error({
                title: i18n.t("common.error"),
                content: i18n.t("discovery.delete.messages.error"),
                duration: 5000,
              })
            }
          })
        },
      })
    },
  },
})
