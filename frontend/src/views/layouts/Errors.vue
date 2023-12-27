<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const props = defineProps<{
  error: any
  stack: any
}>()

const reload = () => {
  window.location.hash = ""
  window.location.reload()
}
</script>

<template>
  <n-card style="align-items: center; justify-content: center">
    <n-result status="error" title="Error" :description="props.error">
    </n-result>
    <br />

    <center>
      <n-button type="primary" @click="reload()"
        ><i class="fa-solid fa-sync mr-2" />
        {{ t("common.refresh") }}
      </n-button>
    </center>

    <br />
    <br />
    <n-log v-if="props.stack.length > 0" :log="`${props.stack}`" />
  </n-card>
</template>
