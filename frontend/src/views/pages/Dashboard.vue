<script setup lang="ts">
import { onMounted } from "vue"
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
  store.fetchVendorCounts()
  store.fetchMostUsedPackages()
})

const chartOptions = {
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
}

const lineOptions = {
  chart: {
    ...chartOptions,
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
}

const barOptions = (categories: string[]) => ({
  chart: {
    ...chartOptions,
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      horizontal: true,
      distributed: true,
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: categories,
    labels: {
      formatter: (val: number) => {
        return val.toFixed(0)
      },
    },
  },
  tooltip: {
    y: {
      formatter: (val: number) => {
        return val.toString()
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
})
</script>

<template>
  <Header
    :title="t('dashboard.title')"
    :description="t('dashboard.description')"
  />
  <n-grid :cols="2" x-gap="15" y-gap="15">
    <n-gi :span="2">
      <Metrics />
    </n-gi>
    <n-gi>
      <n-card style="height: 17rem">
        <template #default>
          <h5 class="text-uppercase fs-13 mb-4">
            {{ t("dashboard.assets.title") }}
            <small class="ml-1">{{ t("common.last_week") }}</small>
          </h5>
          <apexchart
            type="line"
            height="200"
            :options="lineOptions"
            class="mt-n3"
            :series="[
              {
                name: t('dashboard.assets.title'),
                data: store.getAddedAssets.map((item) => [
                  item.date,
                  item.count,
                ]),
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
    <n-gi>
      <n-card style="height: 18rem">
        <template #default>
          <h5 class="text-uppercase fs-13 mb-4">
            {{ t("dashboard.vendor_counts.title") }}
          </h5>
          <apexchart
            type="bar"
            height="225"
            :options="
              barOptions(store.getVendorCounts.map((item) => item.vendor))
            "
            :series="[
              {
                name: t('dashboard.assets.title'),
                data: store.getVendorCounts.map((item) => item.count),
              },
            ]"
          ></apexchart>
        </template>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card style="height: 18rem">
        <template #default>
          <h5 class="text-uppercase fs-13 mb-4">
            {{ t("dashboard.most_used_packages.title") }}
          </h5>
          <apexchart
            type="bar"
            height="225"
            :options="
              barOptions(store.getMostUsedPackages.map((item) => item.name))
            "
            :series="[
              {
                name: t('dashboard.packages.title'),
                data: store.getMostUsedPackages.map((item) => item.count),
              },
            ]"
          ></apexchart>
        </template>
      </n-card>
    </n-gi>
  </n-grid>
</template>
