<script setup lang="ts">
const props = defineProps<{
  options: any[]
}>()
</script>

<template>
  <n-dropdown :options="props.options">
    <n-button size="small" quaternary
      ><i class="fas fa-ellipsis-vertical" />
    </n-button>
  </n-dropdown>
</template>
