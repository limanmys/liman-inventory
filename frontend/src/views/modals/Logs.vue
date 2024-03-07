<script setup lang="ts">
import http from "@/utils/http-common"
import { nextTick, ref } from "vue"
import { useI18n } from "vue-i18n"
import useEmitter from "@/utils/emitter"

const { t } = useI18n()
const show = ref(false)
const discovery_id = ref("")
const logs = ref("")
const logContainer = ref<HTMLElement | null>(null)
const emitter = useEmitter()

emitter.on("showLogsModal", (id: string) => {
  discovery_id.value = id
  query()
})

const scrollToBottom = () => {
  nextTick(() => {
    logContainer.value = document.querySelector(".log-viewer")
    logContainer.value?.scrollTo(0, logContainer.value.scrollHeight)
  })
}

const query = () => {
  http.get(`discoveries/logs/${discovery_id.value}`).then((res) => {
    if (res.status == 200) {
      logs.value = res.data.content
      show.value = true
      scrollToBottom()
    } else {
      window.$notification.error({
        title: t("common.error"),
        content: res.data.message,
        duration: 5000,
      })
    }
  })
}
</script>

<template>
  <n-modal v-model:show="show">
    <n-card style="width: 900px">
      <n-space justify="end" class="mb-3">
        <n-button @click="query">
          <i class="fas fa-refresh mr-2" />
          {{ t("common.refresh") }}
        </n-button>
      </n-space>
      <pre class="log-viewer" v-html="logs" style="height: 500px"></pre>
    </n-card>
  </n-modal>
</template>

<style lang="scss">
.log-viewer {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Fira Code", monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  background-color: #000;
  padding: 10px;
  margin: 0;
  height: 100%;
  overflow: auto;
  border-radius: 3px;
}
</style>
