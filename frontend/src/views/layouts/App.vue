<script setup lang="ts">
import { RouterView } from "vue-router"
import AppProvider from "./AppProvider.vue"
import Navigation from "./Navigation.vue"
import { ref } from "vue"
import VErrorBoundary from "vue-error-boundary"
import Errors from "./Errors.vue"

const err = ref()
const stack = ref()
const errorCapture = (error: any) => {
  err.value = error.error.toString()
  stack.value = error.error.stack as string
}
</script>

<template>
  <div>
    <AppProvider>
      <Navigation />
      <RouterView v-slot="{ Component }">
        <div style="padding: 30px; width: 100%" v-auto-animate>
          <VErrorBoundary stop-propagation @error-captured="errorCapture">
            <template #boundary="{ hasError }">
              <div v-if="hasError">
                <Errors :error="err" :stack="stack" />
              </div>
              <template v-else>
                <component :is="Component" />
              </template>
            </template>
          </VErrorBoundary>
        </div>
      </RouterView>
    </AppProvider>
    <n-back-top :right="50" :bottom="60" />
  </div>
</template>

<style lang="scss">
@import "@/styles/custom.scss";
</style>
