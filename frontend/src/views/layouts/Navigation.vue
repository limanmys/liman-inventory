<script setup lang="ts">
import { useDialog, useLoadingBar, useMessage, useNotification } from "naive-ui"

window.$loadingBar = useLoadingBar()
window.$notification = useNotification()
window.$dialog = useDialog()
window.$message = useMessage()
</script>

<template>
  <div></div>
</template>
