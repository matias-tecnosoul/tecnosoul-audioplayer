<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div v-for="station in stations" :key="station.id" class="col-6">
        <q-card flat bordered class="station-card" align="center">
          <q-img
            :src="station.image"
            :ratio="1"
            class="station-logo cursor-pointer"
            @click="goToStationDetail(station.id)"
            style="max-width: 150px; max-height: 150px"
          />
          <q-card-actions align="center">
            <q-btn
              round
              color="primary"
              size="medium"
              :icon="isPlaying(station) ? 'pause' : 'play_arrow'"
              @click="togglePlay(station)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useRadioStore } from "src/stores/radio";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const router = useRouter();
    const radioStore = useRadioStore();
    const stations = computed(() => radioStore.stations);

    const isPlaying = (station) => {
      return (
        radioStore.currentStation?.id === station.id && radioStore.isPlaying
      );
    };

    const togglePlay = async (station) => {
      if (radioStore.currentStation?.id === station.id) {
        // Same station, toggle play/pause
        await radioStore.togglePlay();
      } else {
        // Different station, set current station and start playback
        await radioStore.setCurrentStation(station);
        await radioStore.play();
      }
    };

    const goToStationDetail = (stationId) => {
      router.push(`/station/${stationId}`);
    };

    return {
      stations,
      isPlaying,
      togglePlay,
      goToStationDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.station-card {
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}
</style>
