<script setup lang="ts">
import { reactive } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import Header from "@/components/UIElements/Header.vue"
import type { IColumn } from "@/models/Column"
import { useAssetStore } from "@/stores/asset"

const { t } = useI18n()
const store = useAssetStore()
const route = useRoute()

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
    title: t("package.table.vendor"),
    key: "vendor",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("package.table.version"),
    key: "version",
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
  <Header :description="t('asset.package.description')">
    <template #header>
      <n-space>
        <n-button size="huge" text @click="$router.back()">
          <i class="fas fa-arrow-left mr-2" />
        </n-button>
        {{ t("asset.package.title") }}
      </n-space>
    </template>
  </Header>

  <AsyncStore
    :dispatcher="store.fetchPackages"
    :data="store.getPackages"
    :columns="columns"
    :args="[route.params.id]"
  />
</template>
