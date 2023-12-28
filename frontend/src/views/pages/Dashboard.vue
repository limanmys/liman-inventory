<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useMetricStore } from "@/stores/metric"
import Header from "@/components/UIElements/Header.vue"
import Metrics from "@/components/UIElements/Metrics.vue"
import apexTR from "@/localization/apex/tr.js"
import apexEN from "@/localization/apex/en.js"

const { t } = useI18n()
const store = useMetricStore()

store.fetchAddedAssets()

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
  <Metrics />
  <n-grid :cols="2" x-gap="15" y-gap="15">
    <n-gi>
      <n-card>
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
  </n-grid>
</template>
