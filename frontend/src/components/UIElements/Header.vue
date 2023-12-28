<script setup lang="ts">
interface HeaderProps {
  title?: string
  description?: string
}

const props = defineProps<HeaderProps>()
</script>

<template>
  <div class="mb-4">
    <n-h2
      class="mb-1"
      style="font-weight: 700; letter-spacing: -0.025em; font-size: 1.5rem"
    >
      <slot name="header">
        {{ props.title }}
      </slot>
    </n-h2>
    <n-text depth="3">{{ props.description }}</n-text>
  </div>
</template>
