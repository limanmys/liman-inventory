<script setup lang="ts">
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import { usePackageStore } from "@/stores/package"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import Header from "@/components/UIElements/Header.vue"
import type { IColumn } from "@/models/Column"
import fileTypes from "@/utils/data/file_types.json"

const { t } = useI18n()
const store = usePackageStore()
const file_type = ref("pdf")

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
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns">
    <template #buttons>
      <n-input-group>
        <n-button type="primary" @click="store.report(file_type)">
          <i class="fas fa-plus mr-2" />
          {{ t("report.create.title") }}
        </n-button>
        <n-popselect v-model:value="file_type" :options="fileTypes">
          <n-button>{{ file_type.toUpperCase() }}</n-button>
        </n-popselect>
      </n-input-group>
    </template>
  </AsyncStore>
</template>
