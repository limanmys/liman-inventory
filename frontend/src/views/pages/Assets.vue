<script setup lang="ts">
import { reactive } from "vue"
import { useI18n } from "vue-i18n"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import type { IColumn } from "@/models/Column"
import { useAssetStore } from "@/stores/asset"

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
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns" />
</template>
