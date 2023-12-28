<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useMetricStore } from "@/stores/metric"
import Header from "@/components/UIElements/Header.vue"
import Metrics from "@/components/UIElements/Metrics.vue"
import apexEN from "@/localization/apex/en.js"
import apexTR from "@/localization/apex/tr.js"
import { formatDate } from "@/utils/format-date"

const { t } = useI18n()
const router = useRouter()
const store = useMetricStore()

onMounted(() => {
  store.fetchAddedAssets()
  store.fetchLastDiscovery()
})

const lineOptions = ref({
  chart: {
    fontFamily: "Inter",
    locales: [
      {
        name: "tr",
        options: {
          ...apexTR,
        },
      },
      {
        name: "en",
        options: {
          ...apexEN,
        },
      },
    ],
    defaultLocale: document.documentElement.lang,
    height: 250,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 1,
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    show: false,
  },
})
</script>

<template>
  <Header
    :title="t('dashboard.title')"
    :description="t('dashboard.description')"
  />
  <n-grid :cols="2" x-gap="15" y-gap="5">
    <n-gi :span="2">
      <Metrics />
    </n-gi>
    <n-gi>
      <n-card style="height: 17rem">
        <template #header>
          <h5 class="text-uppercase fs-13">
            {{ t("dashboard.assets.title") }}
            <small class="ml-1">{{ t("common.last_week") }}</small>
          </h5>
        </template>
        <template #default>
          <apexchart
            type="line"
            height="200"
            :options="lineOptions"
            class="mt-n4"
            :series="[
              {
                name: t('dashboard.assets.title'),
                data: store.getAddedAssets.map((m) => [m.date, m.count]),
              },
            ]"
          ></apexchart>
        </template>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card style="height: 17rem">
        <div style="text-align: center">
          <n-space vertical>
            <i class="fa-solid fa-satellite-dish fa-6x"></i>
            <n-h2 class="mt-2">
              {{ t("dashboard.last_discovery.title") }}
            </n-h2>
            <n-h3 class="mt-n3 mb-2">
              <n-text v-if="store.getLastDiscovery.time" class="text-success">
                {{ formatDate(store.getLastDiscovery.time) }}
              </n-text>
              <n-text v-else class="text-danger">
                {{ t("common.not_found") }}
              </n-text>
            </n-h3>
            {{ t("dashboard.last_discovery.description") }}
            <n-button
              text
              @click="router.push({ name: 'discoveries' })"
              class="text-uppercase mt-2"
              style="font-size: 11px"
            >
              {{ t("discovery.create.title") }}
              <i class="fas fa-arrow-right ml-1" />
            </n-button>
          </n-space>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>
