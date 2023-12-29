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
    last_discovery: {} as { time: string },
    vendor_counts: [] as { vendor: string; count: number }[],
    most_used_packages: [] as { name: string; count: number }[],
  }),
  getters: {
    getAssetCount: (state) => state.asset_count,
    getDiscoveryCount: (state) => state.discovery_count,
    getPackageCount: (state) => state.package_count,
    getAddedAssets: (state) => state.added_assets,
    getLastDiscovery: (state) => state.last_discovery,
    getVendorCounts: (state) => state.vendor_counts,
    getMostUsedPackages: (state) => state.most_used_packages,
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
    async fetchLastDiscovery() {
      return http.get(`metrics/latest_discovery_time`).then((res) => {
        if (res.status == 200) {
          this.last_discovery = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.last_discovery.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async fetchVendorCounts() {
      return http.get(`metrics/vendor_counts`).then((res) => {
        if (res.status == 200) {
          this.vendor_counts = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("dashboard.vendor_counts.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async fetchMostUsedPackages() {
      return http.get(`metrics/most_used_packages`).then((res) => {
        if (res.status == 200) {
          this.most_used_packages = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t(
              "dashboard.most_used_packages.fetch.messages.error",
            ),
            duration: 5000,
          })
        }
      })
    },
  },
})
