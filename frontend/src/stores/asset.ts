import type { IAsset } from "@/models/Asset"
import type { IFilter } from "@/models/Filter"
import type { IPaginator } from "@/models/Paginator"
import http from "@/utils/http-common"
import { i18n } from "@/utils/i18n"
import { defineStore } from "pinia"

export const useAssetStore = defineStore({
  id: "asset",
  state: () => ({
    filter: {} as IFilter,
    assets: {} as IPaginator<IAsset>,
  }),
  getters: {
    get: (state) => state.assets,
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

      return http
        .get(`assets/?${query}`)
        .then((res) => {
          if (res.status == 200) {
            this.assets = res.data
          } else {
            window.$notification.error({
              title: i18n.t("common.error"),
              content: i18n.t("asset.get.messages.error"),
              duration: 5000,
            })
          }
        })
        .catch(() => {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("asset.get.messages.error"),
            duration: 5000,
          })
        })
    },
  },
})
