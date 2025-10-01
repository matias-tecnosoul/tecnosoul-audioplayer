<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="text-black"
        />
        <q-toolbar-title class="flex justify-center q-pb-md q-pt-md">
          <q-img
            src="images/logo-horiz-800.png"
            spinner-color="primary"
            style="height: 65px; max-width: 100%"
            fit="contain"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          icon="radio"
          label="Estaciones"
          caption="Nuestras radios"
        >
          <q-list>
            <q-item clickable to="/station/1">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>111</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/2">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>222</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/3">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>333</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/4">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>444</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/5">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>5551</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/6">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>666</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/7">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>777</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/station/8">
              <q-item-section avatar>
                <q-icon name="radio" />
              </q-item-section>
              <q-item-section>
                <q-item-label>888</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item clickable to="/tunoticia">
          <q-item-section avatar>
            <q-icon name="web" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ejemplo</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/nosotros">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Nosotros</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/contacto">
          <q-item-section avatar>
            <q-icon name="contact_mail" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Contacto</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>



    
        
        
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-black text-white">
      <AudioPlayer />
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import AudioPlayer from "components/AudioPlayer.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    AudioPlayer,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
