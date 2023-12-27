<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { isUndefined } from "lodash"
import type { FormInst } from "naive-ui"
import { useProfileStore } from "@/stores/profile"
import useEmitter from "@/utils/emitter"
import type { IProfile } from "@/models/Profile.ts"

const { t } = useI18n()
const emitter = useEmitter()
const store = useProfileStore()

const formRef = ref<FormInst | null>(null)
const show = ref(false)
const id = ref<string>("")

// TRUE means UPDATE
// FALSE means CREATE
const mode = ref(false)
const defaultValues = {
  name: "",
  username: "",
  password: "",
}

const values = ref({
  ...defaultValues,
})

emitter.on("showProfileModal", (data: IProfile) => {
  if (!isUndefined(data)) {
    mode.value = true
    id.value = data.id
    values.value = {
      name: data.name,
      username: data.username,
      password: data.password,
    }
  } else {
    mode.value = false
    values.value = { ...defaultValues }
  }
  show.value = true
})

const rules = {
  name: {
    required: true,
    trigger: "input",
    message: t("profile.create.rules.name"),
  },
  username: {
    required: true,
    trigger: "input",
    message: t("profile.create.rules.username"),
  },
  password: {
    required: true,
    trigger: "input",
    message: t("profile.create.rules.password"),
  },
}

const submit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        if (!mode.value) {
          await store.create(values.value)
        } else {
          await store.update(id.value, values.value)
        }
        show.value = false
      } catch (error) {
        console.error(error)
      }
    }
  })
}
</script>

<template>
  <n-drawer v-model:show="show" :width="500">
    <n-drawer-content
      :title="!mode ? t('profile.create.title') : t('profile.update.title')"
    >
      <n-form :model="values" ref="formRef" :rules="rules">
        <n-form-item :label="t('profile.create.inputs.name')" path="name">
          <n-input
            v-model:value="values.name"
            maxlength="30"
            show-count
            clearable
          />
        </n-form-item>

        <n-form-item
          :label="t('profile.create.inputs.username')"
          path="username"
        >
          <n-input v-model:value="values.username" />
        </n-form-item>

        <n-form-item
          :label="t('profile.create.inputs.password')"
          path="password"
        >
          <n-input
            v-model:value="values.password"
            type="password"
            show-password-on="click"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" @click="submit">
            {{ !mode ? t("common.create") : t("common.save") }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
