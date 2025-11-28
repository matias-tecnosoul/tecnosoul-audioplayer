<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        v-for="station in stations"
        :key="station.id"
        class="col-6 col-sm-4 col-md-3"
      >
        <q-card class="station-card">
          <q-img :src="station.logo" :ratio="1">
            <div class="absolute-full flex flex-center">
              <q-btn
                round
                :color="station.color"
                :icon="playingStation === station.id ? 'pause' : 'play_arrow'"
                @click="togglePlay(station.id)"
              />
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const playingStation = ref(null);
    const stations = [
      // ... your station data here
    ];

    const togglePlay = (stationId) => {
      playingStation.value =
        playingStation.value === stationId ? null : stationId;
    };

    return {
      stations,
      playingStation,
      togglePlay,
    };
  },
};
</script>

<style lang="scss" scoped>
.station-card {
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
