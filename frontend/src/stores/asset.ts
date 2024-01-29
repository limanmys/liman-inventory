import { defineStore } from "pinia"
import { i18n } from "@/utils/i18n"
import http from "@/utils/http-common"
import type { IAsset } from "@/models/Asset"
import type { IFilter, IPaginator } from "@limanmys/frontend-kit"
import type { IPackage } from "@/models/Package"

export const useAssetStore = defineStore({
  id: "asset",
  state: () => ({
    filter: {} as IFilter,
    assets: {} as IPaginator<IAsset>,
    asset: {} as IAsset,

    pkg_filter: {} as IFilter,
    packages: {} as IPaginator<IPackage>,
  }),
  getters: {
    get: (state) => state.assets,
    getAsset: (state) => state.asset,
    getPackages: (state) => state.packages,
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

      return http.get(`assets/?${query}`).then((res) => {
        if (res.status == 200) {
          this.assets = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("asset.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async show(id: string | string[]) {
      return http.get(`assets/${id}`).then((res) => {
        if (res.status == 200) {
          this.asset = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("asset.show.messages.error"),
            duration: 5000,
          })
        }
      })
    },

    async fetchPackages(payload: IFilter = {} as IFilter, id: string) {
      let q = payload
      if (Object.keys(payload).length < 1) {
        q = this.pkg_filter
      } else {
        this.pkg_filter = q
      }
      const query = new URLSearchParams(q as Record<string, string>).toString()

      return http.get(`assets/packages/${id}?${query}`).then((res) => {
        if (res.status == 200) {
          this.packages = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("asset.package.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
  },
})
