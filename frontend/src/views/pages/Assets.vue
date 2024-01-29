<script setup lang="ts">
import { h, reactive } from "vue"
import { useI18n } from "vue-i18n"
import { NButton } from "naive-ui"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import { useAssetStore } from "@/stores/asset"
import router from "@/router"
import type { IColumn } from "@limanmys/frontend-kit"
import type { IAsset } from "@/models/Asset"
import Header from "@/components/UIElements/Header.vue"

const { t } = useI18n()
const store = useAssetStore()

const columns: IColumn[] = reactive([
  {
    title: t("asset.table.hostname"),
    key: "hostname",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    render: (row: IAsset) => {
      return [h("i", { class: "fab fa-windows mr-2" }), row.hostname]
    },
  },
  {
    title: t("asset.table.address"),
    key: "address",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("asset.table.vendor"),
    key: "vendor",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("asset.table.model"),
    key: "model",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("asset.table.serial_number"),
    key: "serial_number",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("asset.table.package_count"),
    key: "package_count",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    render: (row: IAsset) => {
      return h(
        NButton,
        {
          text: true,
          size: "small",
          type: "primary",
          class: "ml-2",
          onClick: () => router.push({ name: "asset", params: { id: row.id } }),
        },
        { default: () => row.package_count },
      )
    },
  },
  {
    title: t("asset.table.updated_at"),
    key: "updated_at",
    sorter: "default",
    type: "date",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
])
</script>

<template>
  <Header :title="t('asset.title')" :description="t('asset.description')" />
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns" />
</template>
