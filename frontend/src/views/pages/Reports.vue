<script setup lang="ts">
import { h, reactive } from "vue"
import { useI18n } from "vue-i18n"
import { NButton, NTag } from "naive-ui"
import { useReportStore } from "@/stores/report"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import fileDownload from "js-file-download"
import http from "@/utils/http-common"
import { formatDate } from "@/utils/format-date"
import fileTypes from "@/utils/data/file_types.json"
import Header from "@/components/UIElements/Header.vue"
import type { IReport } from "@/models/Report"
import type { IColumn } from "@/models/Column"

const { t } = useI18n()
const store = useReportStore()

const columns: IColumn[] = reactive([
  {
    title: t("report.table.report_type"),
    key: "report_type",
    sorter: "default",
    ellipsis: {
      tooltip: true,
    },
    filterOptions: [
      { label: t("report.type.asset_packages"), value: "asset_packages" },
      { label: t("report.type.asset"), value: "asset" },
      { label: t("report.type.package"), value: "package" },
    ],
    filter(value: string, row: IReport) {
      return row.report_type === value
    },
    render: (row: IReport) => {
      return [
        h("i", { class: `fas fa-file-alt mr-2` }),
        t(`report.type.${row.report_type}`),
      ]
    },
  },
  {
    title: t("report.table.file_type"),
    key: "file_type",
    sorter: "default",
    filterOptions: fileTypes,
    filter(value: string, row: IReport) {
      return row.file_type === value
    },
    render: (row: IReport) => {
      return [
        h("i", { class: `fas fa-file-${row.file_type} mr-2` }),
        row.file_type.toUpperCase(),
      ]
    },
  },
  {
    title: t("report.table.status"),
    key: "status",
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    filterOptions: [
      { label: t(`common.status.in_progress`), value: "in_progress" },
      { label: t(`common.status.pending`), value: "pending" },
      { label: t(`common.status.done`), value: "done" },
      { label: t(`common.status.error`), value: "error" },
    ],
    filter(value: string, row: IReport) {
      return row.status === value
    },
    render: (row: IReport) => {
      if (row.status == "in_progress" || row.status == "pending") {
        return h(
          NTag,
          { type: "info" },
          {
            default: () => [
              h("i", { class: "fas fa-spinner fa-spin mr-2" }),
              t(`common.status.${row.status}`),
            ],
          },
        )
      } else if (row.status == "done") {
        return h(
          NTag,
          { type: "success" },
          {
            default: () => [
              h("i", { class: "fas fa-circle-check mr-2" }),
              t(`common.status.${row.status}`),
            ],
          },
        )
      } else if (row.status == "error") {
        return h(
          NTag,
          { type: "error" },
          {
            default: () => [
              h("i", { class: "fas fa-circle-exclamation mr-2" }),
              t(`common.status.${row.status}`),
            ],
          },
        )
      }
    },
  },
  {
    title: t("report.table.message"),
    key: "message",
    filterable: true,
    sorter: "default",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("report.table.created_at"),
    key: "created_at",
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    type: "date",
  },
  {
    width: 175,
    key: "actions",
    render: (row: IReport) => {
      return h(
        NButton,
        {
          size: "small",
          disabled: row.status !== "done",
          onClick: () => {
            http
              .downloadFile("downloadFile", `jobs/${row.id}`, {
                data: JSON.stringify({
                  format: row.file_type,
                }),
              })
              .then(async (res) => {
                if (res.status == 200) {
                  fileDownload(
                    res.data,
                    `${t(`report.type.${row.report_type}`)} ${formatDate(
                      row.created_at,
                    )}.${row.file_type}`,
                  )
                  window.$notification.success({
                    title: t("common.success"),
                    content: t("report.download.messages.success"),
                    duration: 3000,
                  })
                } else {
                  window.$notification.error({
                    title: t("common.error"),
                    content: t("report.download.messages.error"),
                    duration: 5000,
                  })
                }
              })
          },
        },
        {
          default: () => [
            h("i", { class: "fas fa-download mr-2" }),
            t("report.download.title"),
          ],
        },
      )
    },
  },
])
</script>

<template>
  <Header :title="t('report.title')" :description="t('report.description')" />
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns" />
</template>
