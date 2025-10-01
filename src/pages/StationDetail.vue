<template>
  <q-page class="q-pa-md">
    <div v-if="station">
      <q-card class="station-detail">
        <div class="station-image-container">
          <q-img
            :src="station.image"
            spinner-color="primary"
            style="height: 200px; width: 200px"
            fit="contain"
            class="station-image"
          />
        </div>
        <q-card-section>
          <div class="text-body1">
            {{ station.name }}
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            round
            size="large"
            :icon="isPlaying ? 'pause' : 'play_arrow'"
            color="primary"
            @click="togglePlay"
          />
        </q-card-actions>
      </q-card>

      <q-card v-if="hasSocialLinks" class="q-mt-md" align="center">
        <q-card-section>
          <div class="text-h6">Vías de Contacto</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-for="(link, network) in validSocialLinks"
            :key="network"
            :href="link"
            target="_blank"
            :icon="getSocialIcon(network)"
            flat
            round
            size="large"
            color="primary"
            class="q-mr-sm"
          />
        </q-card-actions>
      </q-card>

      <q-card class="q-mt-md" align="center">
        <q-card-section>
          <div class="text-h6">Ejemplo</div>
          <q-btn
            flat
            class="full-width"
            type="a"
            target="_blank"
            href="https://www.ejemplo.com.ar"
          >
            <q-img
              src="images/logo-horiz-720.png"
              spinner-color="primary"
              style="max-width: 300px; max-height: 100px"
              fit="contain"
              class="station-image"
            />
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="text-center">
      <q-spinner-dots color="primary" size="40px" />
      <div class="q-mt-sm">Cargando info...</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useRadioStore } from "src/stores/radio";

export default defineComponent({
  name: "StationDetail",
  setup() {
    const route = useRoute();
    const radioStore = useRadioStore();

    const station = computed(() =>
      radioStore.stations.find((s) => s.id === parseInt(route.params.id))
    );

    const isPlaying = computed(
      () =>
        radioStore.isPlaying &&
        radioStore.currentStation?.id === station.value?.id
    );

    const validSocialLinks = computed(() => {
      if (!station.value || !station.value.social) return {};
      return Object.entries(station.value.social)
        .filter(([_, link]) => link && link.trim() !== "")
        .reduce((acc, [network, link]) => {
          acc[network] = link;
          return acc;
        }, {});
    });

    const hasSocialLinks = computed(
      () => Object.keys(validSocialLinks.value).length > 0
    );

    const togglePlay = async () => {
      if (station.value) {
        if (radioStore.currentStation?.id === station.value.id) {
          // Same station, toggle play/pause
          await radioStore.togglePlay();
        } else {
          // Different station, set current station and start playback
          await radioStore.setCurrentStation(station.value);
          await radioStore.play();
        }
      }
    };

    const getSocialIcon = (network) => {
      const iconMap = {
        facebook: "fab fa-facebook-f",
        twitter: "fab fa-twitter",
        instagram: "fab fa-instagram",
        youtube: "fab fa-youtube",
        whatsapp: "fab fa-whatsapp",
      };
      return iconMap[network.toLowerCase()] || "fas fa-link";
    };

    return {
      station,
      isPlaying,
      hasSocialLinks,
      validSocialLinks,
      togglePlay,
      getSocialIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.station-image-container {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.station-image {
  ::deep(.q-img__content) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.station-detail {
  max-width: 600px;
  margin: 0 auto;
}
</style>
