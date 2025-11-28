<template>
  <q-page class="q-pa-md">
    <q-card class="about-us-card">
      <q-card-section>
        <div class="text-h4 q-mb-md">Nosotros</div>
        <p class="text-body1">
          Descripcion...
        </p>
        <p class="text-body1">
          Descripcion...
        </p>
      </q-card-section>
      <q-card-section>
        <div class="text-h5 q-mb-md">Nuestras Radios</div>
        <q-list>
          <q-item v-for="station in radioStations" :key="station.id">
            <q-item-section avatar>
              <q-avatar>
                <img :src="station.image" :alt="station.name" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ station.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRadioStore } from "src/stores/radio";

export default defineComponent({
  name: "NosotrosPage",
  setup() {
    const radioStore = useRadioStore();
    const radioStations = radioStore.stations;

    return {
      radioStations,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-us-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
