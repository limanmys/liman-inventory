<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import type { FormInst } from "naive-ui"
import { useDiscoveryStore } from "@/stores/discovery"
import useEmitter from "@/utils/emitter"
import type { IDiscoveryCreate } from "@/models/Discovery"
import ProfileSelect from "@/components/Select/Profile.vue"

const { t } = useI18n()
const emitter = useEmitter()
const store = useDiscoveryStore()

const formRef = ref<FormInst | null>(null)
const show = ref(false)

const values = ref<IDiscoveryCreate>({
  ip_range: "",
  profile_id: null,
})

emitter.on("showDiscoveryModal", () => {
  show.value = true
})

const rules = {
  ip_range: {
    required: true,
    trigger: "input",
    message: t("discovery.create.rules.ip_range"),
  },
  profile_id: {
    required: true,
    trigger: "input",
    message: t("discovery.create.rules.profile"),
  },
}

const submit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await store.create(values.value)
      show.value = false
    }
  })
}
</script>

<template>
  <n-drawer v-model:show="show" :width="500">
    <n-drawer-content :title="t('discovery.create.title')">
      <n-form :model="values" ref="formRef" :rules="rules">
        <n-form-item
          :label="t('discovery.create.inputs.ip_range')"
          path="ip_range"
        >
          <n-input
            v-model:value="values.ip_range"
            clearable
            placeholder="127.0.0.1-255"
          />
        </n-form-item>
        <n-form-item
          :label="t('discovery.create.inputs.profile')"
          path="profile_id"
        >
          <ProfileSelect v-model:profile="values.profile_id" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" @click="submit">
            {{ t("common.create") }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
