import { defineStore } from "pinia"
import http from "@/utils/http-common"
import { i18n } from "@/utils/i18n"
import type { IFilter } from "@/models/Filter"
import type { IPaginator } from "@/models/Paginator"
import type { IProfile, IProfileCreate } from "@/models/Profile"

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    filter: {} as IFilter,
    profiles: {} as IPaginator<IProfile>,
  }),
  getters: {
    get: (state) => state.profiles,
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

      return http.get(`profiles/?${query}`).then((res) => {
        if (res.status == 200) {
          this.profiles = res.data
        } else {
          window.$notification.error({
            title: i18n.t("common.error"),
            content: i18n.t("profile.fetch.messages.error"),
            duration: 5000,
          })
        }
      })
    },
    async create(payload: IProfileCreate) {
      return http
        .post(`profiles`, {
          data: JSON.stringify(payload),
        })
        .then((res) => {
          if (res.status == 200) {
            window.$notification.success({
              title: i18n.t("common.success"),
              content: i18n.t("profile.create.messages.success"),
              duration: 3000,
            })
            this.fetch()
          } else {
            window.$notification.error({
              title: i18n.t("common.error"),
              content: i18n.t("profile.create.messages.error"),
              duration: 5000,
            })
          }
        })
    },
    async update(id: string, payload: IProfileCreate) {
      return http
        .patch(`profiles/${id}`, {
          data: JSON.stringify(payload),
        })
        .then((res) => {
          if (res.status == 200) {
            window.$notification.success({
              title: i18n.t("common.success"),
              content: i18n.t("profile.update.messages.success"),
              duration: 3000,
            })
            this.fetch()
          } else {
            window.$notification.error({
              title: i18n.t("common.error"),
              content: i18n.t("profile.update.messages.error"),
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
          return http.delete(`profiles/${id}`).then((res) => {
            if (res.status == 200) {
              window.$notification.success({
                title: i18n.t("common.success"),
                content: i18n.t("profile.delete.messages.success"),
                duration: 3000,
              })
              this.fetch()
            } else {
              window.$notification.error({
                title: i18n.t("common.error"),
                content: i18n.t("profile.delete.messages.error"),
                duration: 5000,
              })
            }
          })
        },
      })
    },
  },
})
