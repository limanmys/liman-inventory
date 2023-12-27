<script setup lang="ts">
import { NCheckbox, NSpace } from "naive-ui"
import { h, toRefs } from "vue"

const props = defineProps<{
  columns: any[]
}>()

const { columns } = toRefs(props)

function render() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(
        NSpace,
        { vertical: true },
        Array.from(columns.value, (column) => {
          if (
            column.key == "id" ||
            column.key == "actions" ||
            column.key == "mysweetactions"
          ) {
            return
          }
          return h(NCheckbox, {
            label: column.title,
            value: column.key,
            checked: column.show ? true : false,
            "on-update:checked": (e: boolean) => {
              column.show = e
              if (!e) {
                column.className = "d-none"
              } else {
                column.className = ""
              }
              emit("change", columns.value)
            },
          })
        }),
      ),
    ],
  )
}

// eslint-disable-next-line
const emit = defineEmits<{
  (e: "change", id: any[]): void
}>()
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="[
      {
        key: 'render',
        type: 'render',
        render: render,
      },
    ]"
  >
    <n-button type="primary"><i class="fas fa-cogs" /></n-button>
  </n-dropdown>
</template>
