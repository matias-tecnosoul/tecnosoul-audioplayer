<template>
  <q-toolbar>
    <!-- Display station image if available -->
    <q-avatar v-if="currentStation">
      <img :src="currentStation.image" />
    </q-avatar>

    <!-- Display station name if available -->
    <q-toolbar-title class="q-ml-sm">
      {{ currentStation ? currentStation.name : "" }}
    </q-toolbar-title>

    <!-- Play/Pause button -->
    <q-btn
      flat
      round
      :icon="isPlaying ? 'pause' : 'play_arrow'"
      @click="togglePlay"
      color="white"
    />
  </q-toolbar>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRadioStore } from "src/stores/radio";

export default defineComponent({
  name: "AudioPlayer",
  setup() {
    const radioStore = useRadioStore();

    const currentStation = computed(() => radioStore.currentStation);
    const isPlaying = computed(() => radioStore.isPlaying);

    const togglePlay = async () => {
      await radioStore.togglePlay();
    };

    return {
      currentStation,
      isPlaying,
      togglePlay,
    };
  },
});
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
