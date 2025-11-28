<template>
  <q-page class="q-pa-md">
    <q-card class="contact-card">
      <q-card-section>
        <div class="text-h5 q-mb-md">Información de Contacto</div>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="location_on" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dirección</q-item-label>
              <q-item-label caption
                >...</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="phone" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Teléfono</q-item-label>
              <q-item-label caption>+54...</q-item-label>
              <q-item-label caption>+54...</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="email" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Email</q-item-label>
              <q-item-label caption
                >info@tecnosoul.com.ar</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ContactoPage",
});
</script>

<style lang="scss" scoped>
.contact-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
