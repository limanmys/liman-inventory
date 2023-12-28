import http from "@/utils/http-common"
import { i18n } from "@/utils/i18n"
import { defineStore } from "pinia"

export const useMetricStore = defineStore({
  id: "metric",
  state: () => ({
    asset_count: 0,
    discovery_count: 0,
    package_count: 0,
    added_assets: [] as { date: string; count: number }[],
  }),
  getters: {
    getAssetCount: (state) => state.asset_count,
    getDiscoveryCount: (state) => state.discovery_count,
    getPackageCount: (state) => state.package_count,
    getAddedAssets: (state) => state.added_assets,
  },
  actions: {
    async fetchAssetCount() {
      return http.get(`metrics/asset_count`).then((res) => {
        if (res.status == 200) {
          this.asset_count = res.data.count
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.assets.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async fetchDiscoveryCount() {
      return http.get(`metrics/discovery_count`).then((res) => {
        if (res.status == 200) {
          this.discovery_count = res.data.count
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.discoveries.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async fetchPackageCount() {
      return http.get(`metrics/package_count`).then((res) => {
        if (res.status == 200) {
          this.package_count = res.data.count
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.packages.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async fetchAddedAssets() {
      return http.get(`metrics/added_assets`).then((res) => {
        if (res.status == 200) {
          this.added_assets = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.added_assets.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
  },
})
