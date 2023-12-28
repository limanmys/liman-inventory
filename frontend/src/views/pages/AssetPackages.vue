<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useAssetStore } from "@/stores/asset"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import Header from "@/components/UIElements/Header.vue"
import type { IColumn } from "@/models/Column"

const { t } = useI18n()
const store = useAssetStore()
const route = useRoute()

onMounted(() => {
  store.show(route.params.id)
})

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
      <n-button size="huge" text @click="$router.back()">
        <i class="fas fa-arrow-left mr-3" />
      </n-button>
      <i class="fab fa-windows mr-2" />
      <n-text underline>
        {{ `${store.getAsset.hostname}` }}
      </n-text>
      {{ t("asset.package.title") }}
    </template>
  </Header>

  <AsyncStore
    :dispatcher="store.fetchPackages"
    :data="store.getPackages"
    :columns="columns"
    :args="[route.params.id]"
  />
</template>
