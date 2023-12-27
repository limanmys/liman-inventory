<script setup lang="ts">
import { h, reactive } from "vue"
import { useI18n } from "vue-i18n"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import DropdownMenu from "@/components/Table/DropdownMenu.vue"
import DiscoveryModal from "@/views/modals/Discovery.vue"
import { useDiscoveryStore } from "@/stores/discovery"
import useEmitter from "@/utils/emitter"
import type { IColumn } from "@/models/Column"
import type { IDiscovery } from "@/models/Discovery"
import Header from "@/components/UIElements/Header.vue"
import { NButton, NTag } from "naive-ui"

const { t } = useI18n()
const store = useDiscoveryStore()
const emitter = useEmitter()

const columns: IColumn[] = reactive([
  {
    title: t("discovery.table.ip_range"),
    key: "ip_range",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("discovery.table.profile"),
    key: "profile.name",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("discovery.table.discovery_status"),
    key: "discovery_status",
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    filterOptions: [
      { label: t(`discovery.status.in_progress`), value: "in_progress" },
      { label: t(`discovery.status.pending`), value: "pending" },
      { label: t(`discovery.status.done`), value: "done" },
      { label: t(`discovery.status.error`), value: "error" },
    ],
    filter(value: string, row: IDiscovery) {
      return row.discovery_status === value
    },
    render: (row: IDiscovery) => {
      if (
        row.discovery_status == "in_progress" ||
        row.discovery_status == "pending"
      ) {
        return h(
          NTag,
          { type: "info" },
          {
            default: () => [
              h("i", { class: "fas fa-spinner fa-spin mr-2" }),
              t(`discovery.status.${row.discovery_status}`),
            ],
          },
        )
      } else if (row.discovery_status == "done") {
        return h(
          NTag,
          { type: "success" },
          {
            default: () => [
              h("i", { class: "fas fa-circle-check mr-2" }),
              t(`discovery.status.${row.discovery_status}`),
            ],
          },
        )
      } else if (row.discovery_status == "error") {
        return h(
          NTag,
          { type: "error" },
          {
            default: () => [
              h("i", { class: "fas fa-circle-exclamation mr-2" }),
              t(`discovery.status.${row.discovery_status}`),
            ],
          },
        )
      }
    },
  },
  {
    title: t("discovery.table.message"),
    key: "message",
    filterable: true,
    sorter: "default",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("discovery.table.updated_at"),
    key: "updated_at",
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
    type: "date",
  },
  {
    key: "actions",
    width: 180,
    render: (row: IDiscovery) => {
      return [
        h(
          NButton,
          {
            size: "small",
            onClick: () => {
              store.run(row.id)
            },
          },
          {
            default: () => [
              h("i", { class: "fas fa-bullseye mr-2" }),
              h("span", "Tarama Başlat"),
            ],
          },
        ),
        h(DropdownMenu, {
          options: [
            {
              label: t("common.delete"),
              key: "delete",
              icon: () => h("i", { class: "fas fa-trash-can" }),
              props: {
                onClick: () => {
                  store.delete(row.id)
                },
              },
            },
          ],
        }),
      ]
    },
  },
])
</script>

<template>
  <Header
    :title="t('discovery.title')"
    :description="t('discovery.description')"
  />
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns">
    <template #buttons>
      <n-button type="primary" @click="emitter.emit('showDiscoveryModal')">
        <i class="fas fa-plus mr-2" />
        {{ t("discovery.create.title") }}
      </n-button>
    </template>
  </AsyncStore>
  <DiscoveryModal />
</template>
