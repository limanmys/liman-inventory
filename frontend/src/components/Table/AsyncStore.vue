<script setup lang="ts">
import { computed, h, onMounted, reactive, ref, toRefs, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { isEqual } from "lodash"
import { NButton, NDataTable, NInput, NSpace } from "naive-ui"
import ColumnSelector from "@/components/Table/ColumnSelector.vue"
import type { IData } from "@/models/Data"
import type { IFilter } from "@/models/Filter"
import type { IPaginator } from "@/models/Paginator"
import { formatDate } from "@/utils/format-date"

export interface Props {
  dispatcher: (payload?: IFilter, ...args: any) => Promise<any>
  data: IPaginator<any>
  columns: any[]
  pageSize?: number
  title?: string
  filter?: any
  selected?: any[]
  args: any[]
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 15,
  title: "",
  args: [] as any,
})

const { t } = useI18n()

const loading = ref(true)
const search = ref("")
const filters = ref([] as IData[])
const sort = ref("")
const route = useRoute()

const escapeSelector = (s: string) => {
  return s.replace(/(:|\.|\[|\])/g, "\\$1")
}

const { columns, pageSize } = toRefs(props)

columns.value.forEach((column, i) => {
  column.show = true
  if (column.type === "date") {
    column.width = 210

    column.render = (row: any) => {
      return formatDate(row[column.key])
    }
  }

  if (column.filterable) {
    column = {
      ...column,
      filterOptionValue: null,
      filter: () => true,
      renderFilterMenu: ({ hide }: { hide: any }) => {
        return h(NSpace, { style: { padding: "12px" }, vertical: true }, [
          h(NInput, {
            placeholder: t("table.filter.placeholder"),
            id: column.key + "-filter",
            defaultValue: column.filterOptionValue,
            maxlength: 60,
            showCount: true,
          }),
          h(
            "div",
            {
              style: "float: right",
            },
            [
              h(NButton, {
                size: "tiny",
                "on-click": () => {
                  const filterInput: any = document.querySelector(
                    "#" + escapeSelector(column.key) + "-filter input",
                  )
                  filterInput.value = ""
                  columns.value[i].filterOptionValue = null
                  filters.value = filters.value.filter((item: IData) => {
                    return item.key != column.key
                  })

                  query().then(() => hide())
                },
                innerHTML: t("table.filter.clear"),
              }),
              h(NButton, {
                size: "tiny",
                type: "primary",
                "on-click": () => {
                  const filterInput: any = document.querySelector(
                    "#" + escapeSelector(column.key) + "-filter input",
                  )

                  if (filterInput.value.length > 0) {
                    columns.value[i].filterOptionValue = filterInput.value
                    filters.value = filters.value.filter((item: IData) => {
                      return item.key != column.key
                    })
                    filters.value.push({
                      key: column.key,
                      value: filterInput.value,
                    })

                    query().then(() => hide())
                  } else {
                    columns.value[i].filterOptionValue = null
                    filterInput.value = null

                    hide()
                  }
                },
                innerHTML: t("table.filter.apply"),
              }),
            ],
          ),
        ])
      },
    }
  }

  if (column.defaultFilterOptionValues) {
    filters.value.push({
      key: column.key,
      value: column.defaultFilterOptionValues,
    })
  }

  columns.value[i] = column
})
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: pageSize.value,
  itemCount: 0,
  prefix({ itemCount }: any) {
    return `Toplam: ${itemCount}`
  },
})

onMounted(() => {
  query(pagination.page)
})

const createDebounce = () => {
  let timeout: number | undefined = 0
  return function (fnc: () => void, delayMs: any) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fnc()
    }, delayMs || 500)
  }
}
const searchDebounce = createDebounce()

const handleSorterChange = (sorter: any) => {
  sort.value = sorter
  if (sorter.order == false) {
    sort.value = ""
  } else {
    switch (sorter.order) {
      case "descend":
        sort.value = `-${sorter.columnKey}`
        break
      case "ascend":
        sort.value = `+${sorter.columnKey}`
        break
      default:
        sort.value = ""
        break
    }
  }
  query()
}

const handleSearch = () => {
  query()
}

const handlePageChange = (currentPage: any) => {
  query(currentPage)
}

const handleFilterChange = (filters: any) => {
  loading.value = true
  Object.keys(filters).forEach((item) => {
    filters.value = filters.value.filter((i: IData) => {
      return i.key != item
    })
    if (filters[item] && filters[item].length > 0) {
      filters.value.push({
        key: item,
        value: filters[item],
      })
    }
  })
  query()
}

function query(page = 1) {
  loading.value = true
  const obj = { page: page, per_page: props.pageSize } as IFilter
  if (search.value != "") {
    obj.search = search.value
  }

  filters.value.forEach((item: any) => {
    if (item.type == "query") {
      // Clear specified filter
      filters.value = filters.value.filter((i: IData) => {
        return i.key != item.key
      })
    }
  })

  if (props.filter && props.filter()) {
    filters.value.push(...props.filter())
  }

  if (filters.value.length > 0) {
    obj.filter = JSON.stringify(filters.value)
  }

  if (sort.value != "") {
    obj.sort = sort.value
  }

  return props.dispatcher(obj, ...props.args).then(() => {
    loading.value = false
  })
}

watch(
  () => props.data,
  () => {
    pagination.page = props.data.current_page
    pagination.pageCount = props.data.total_pages
    pagination.itemCount = props.data.total_records
  },
)

const refresh = () => {
  query()
}

watch(
  () => route.query,
  (newVal, oldVal) => {
    if (!isEqual(newVal, oldVal)) {
      query()
    }
  },
)

const emit = defineEmits<{
  (event: "update:selected", ...args: any[]): void
}>()

const selectedKeys = computed({
  get() {
    return props.selected
  },
  set(value) {
    emit("update:selected", value)
  },
})
</script>

<template>
  <n-space
    justify="space-between"
    style="margin-bottom: 15px; align-items: center"
  >
    <n-space size="small">
      <slot name="buttons"> </slot>
    </n-space>

    <div class="table-right-side">
      <n-space class="items-center" size="small">
        <n-input
          v-model:value="search"
          :placeholder="t('table.search.placeholder')"
          @input="
            searchDebounce(() => {
              handleSearch()
            }, 1000)
          "
        >
          <template #prefix>
            <i class="fas fa-search mr-1" />
          </template>
        </n-input>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button ghost @click="refresh()"
              ><i class="fas fa-sync" />
            </n-button>
          </template>
          {{ t("common.refresh") }}
        </n-tooltip>

        <ColumnSelector :columns="columns" @change="columns = $event" />
      </n-space>
    </div>
  </n-space>
  <n-data-table
    :row-key="(rowData: IData) => rowData.id"
    remote
    ref="table"
    :columns="columns"
    :data="props.data.records"
    :loading="loading"
    :pagination="pagination"
    @update:sorter="handleSorterChange"
    @update:page="handlePageChange"
    @update:filters="handleFilterChange"
    :single-line="false"
    striped
    size="small"
    v-model:checked-row-keys="selectedKeys"
  />
</template>
