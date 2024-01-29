<script setup lang="ts">
import { darkTheme } from "naive-ui"
import { ref, onMounted, nextTick } from "vue"
import {
  LimanLocaleProvider,
  LimanDateLocaleProvider,
  LimanLightThemeOverrides,
  LimanDarkThemeOverrides,
} from "@limanmys/frontend-kit"

const theme = ref()

onMounted(() => {
  nextTick(() => {
    theme.value =
      document
        .querySelector("[name='color-scheme']")
        ?.getAttribute("content") === "dark"
        ? darkTheme
        : null

    // Add body class
    if (theme.value !== null) {
      document.body.classList.add("dark")
    }

    // Remove body class
    if (theme.value === null) {
      document.body.classList.remove("dark")
    }
  })

  setTimeout(() => {
    document.head.addEventListener("DOMSubtreeModified", function () {
      theme.value =
        document
          .querySelector("[name='color-scheme']")
          ?.getAttribute("content") === "dark"
          ? darkTheme
          : null

      // Add body class
      if (theme.value !== null) {
        document.body.classList.add("dark")
      }

      // Remove body class
      if (theme.value === null) {
        document.body.classList.remove("dark")
      }
    })
  }, 1000)
})
</script>

<template>
  <n-config-provider
    :locale="LimanLocaleProvider"
    :date-locale="LimanDateLocaleProvider"
    :theme-overrides="
      theme === null ? LimanLightThemeOverrides : LimanDarkThemeOverrides
    "
    :theme="theme"
  >
    <n-global-style />
    <n-loading-bar-provider>
      <n-notification-provider placement="bottom-right" :max="1">
        <n-message-provider>
          <n-dialog-provider>
            <slot></slot>
          </n-dialog-provider>
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
