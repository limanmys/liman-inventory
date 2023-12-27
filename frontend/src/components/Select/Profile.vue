<script setup lang="ts">
import { useProfileStore } from "@/stores/profile"
import type { IProfile } from "@/models/Profile"
import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const store = useProfileStore()
const { t } = useI18n()

const props = defineProps<{
  profile: IProfile
}>()

const emit = defineEmits<{
  (event: "update:profile", ...args: any[]): void
}>()

const value = computed({
  get() {
    return props.profile
  },
  set(value) {
    emit("update:profile", value)
  },
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

const loading = ref(true)
const search = (query: string) => {
  loading.value = true
  searchDebounce(() => {
    store
      .fetch({
        search: query,
        per_page: 20,
      })
      .then(() => {
        loading.value = false
      })
  }, 300)
}

onMounted(() => {
  store.fetch().then(() => {
    loading.value = false
  })
})
</script>

<template>
  <n-select
    v-model:value="value"
    filterable
    :placeholder="t('profile.select.placeholder')"
    :options="store.get.records"
    :loading="loading"
    clearable
    remote
    :clear-filter-after-select="false"
    @search="search"
    label-field="name"
    value-field="id"
  />
</template>
