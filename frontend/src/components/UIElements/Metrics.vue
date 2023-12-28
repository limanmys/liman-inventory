<script setup lang="ts">
import { useMetricStore } from "@/stores/metric"
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()
const store = useMetricStore()

onMounted(() => {
  store.fetchAssetCount()
  store.fetchDiscoveryCount()
  store.fetchPackageCount()
})
</script>

<template>
  <n-card class="homepage-widget mb-2" content-style="padding: 0">
    <div class="card-body p-0">
      <div class="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
        <div class="col">
          <div class="mt-3 mt-md-0 py-4 px-4">
            <h5 class="text-uppercase fs-13">
              {{ t("dashboard.assets.title") }}
              <i class="fas fa-desktop fs-18 float-end align-middle" />
            </h5>
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <i class="ri-exchange-dollar-line display-6" />
              </div>
              <div class="flex-grow-1 ms-3">
                <h2 class="mb-2">
                  <span class="counter-value">
                    {{ store.getAssetCount }}
                  </span>
                </h2>
                <n-button
                  text
                  @click="router.push({ name: 'assets' })"
                  class="text-uppercase"
                  style="font-size: 11px"
                  >{{ t("dashboard.assets.button") }}
                  <i class="fas fa-arrow-right ml-1" />
                </n-button>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mt-3 mt-md-0 py-4 px-4">
            <h5 class="text-uppercase fs-13">
              {{ t("dashboard.discoveries.title") }}
              <i class="fas fa-satellite-dish fs-18 float-end align-middle" />
            </h5>
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <i class="ri-exchange-dollar-line display-6" />
              </div>
              <div class="flex-grow-1 ms-3">
                <h2 class="mb-2">
                  <span class="counter-value">
                    {{ store.getDiscoveryCount }}
                  </span>
                </h2>
                <n-button
                  text
                  @click="router.push({ name: 'discoveries' })"
                  class="text-uppercase"
                  style="font-size: 11px"
                  >{{ t("dashboard.discoveries.button") }}
                  <i class="fas fa-arrow-right ml-1" />
                </n-button>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mt-3 mt-md-0 py-4 px-4">
            <h5 class="text-uppercase fs-13">
              {{ t("dashboard.packages.title") }}
              <i class="fas fa-box fs-18 float-end align-middle" />
            </h5>
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <i class="ri-exchange-dollar-line display-6" />
              </div>
              <div class="flex-grow-1 ms-3">
                <h2 class="mb-2">
                  <span class="counter-value">
                    {{ store.getPackageCount }}
                  </span>
                </h2>
                <n-button
                  text
                  @click="router.push({ name: 'packages' })"
                  class="text-uppercase"
                  style="font-size: 11px"
                  >{{ t("dashboard.packages.button") }}
                  <i class="fas fa-arrow-right ml-1" />
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>
