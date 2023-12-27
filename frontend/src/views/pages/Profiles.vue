<script setup lang="ts">
import { h, reactive } from "vue"
import { useI18n } from "vue-i18n"
import AsyncStore from "@/components/Table/AsyncStore.vue"
import DropdownMenu from "@/components/Table/DropdownMenu.vue"
import ProfileModal from "@/views/modals/Profile.vue"
import { useProfileStore } from "@/stores/profile"
import useEmitter from "@/utils/emitter"
import type { IColumn } from "@/models/Column"

const { t } = useI18n()
const store = useProfileStore()
const emitter = useEmitter()

const columns: IColumn[] = reactive([
  {
    title: t("profile.table.name"),
    key: "name",
    filterable: true,
    sorter: "default",
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: t("profile.table.updated_at"),
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
    width: 40,
    render: (row: any) => {
      return h(DropdownMenu, {
        options: [
          {
            label: t("common.edit"),
            key: "edit",
            icon: () => h("i", { class: "fas fa-pen-to-square" }),
            props: {
              onClick: () => {
                emitter.emit("showProfileModal", row)
              },
            },
          },
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
      })
    },
  },
])
</script>

<template>
  <AsyncStore :dispatcher="store.fetch" :data="store.get" :columns="columns">
    <template #buttons>
      <n-button type="primary" @click="emitter.emit('showProfileModal')">
        {{ t("profile.create.title") }}
      </n-button>
    </template>
  </AsyncStore>
  <ProfileModal />
</template>
