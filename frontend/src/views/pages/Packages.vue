<script setup lang="ts">
import { reactive } from "vue"
import { useI18n } from "vue-i18n"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import type { IColumn } from "@/models/Column"
import { usePackageStore } from "@/stores/package"
import Header from "@/components/UIElements/Header.vue"

const { t } = useI18n()
const store = usePackageStore()

const columns: IColumn[] = reactive([
  {
    title: t("package.table.name"),
    key: "name",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("package.table.count"),
    key: "count",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
])
</script>

<template>
  <Header :title="t('package.title')" :description="t('package.description')" />
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns" />
</template>
