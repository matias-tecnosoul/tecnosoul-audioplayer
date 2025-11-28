<template>
  <q-page class="q-pa-md">
    <q-card class="q-mt-md" align="center">
      <q-card-section>
        <div class="text-h6">Ejemplo</div>
      </q-card-section>
      
      <q-card-section>
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
      
      <q-card-section>
        <a 
          href="https://www.ejemplo.com.ar" 
          target="_blank" 
          class="text-primary website-link"
        >
          www.ejemplo.com.ar
        </a>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageEjemplo'
}
</script>

<style lang="scss" scoped>
.station-image {
  margin-bottom: 16px;
}

.website-link {
  font-size: 1.2rem; // Increase font size
  font-weight: 500; // Make it slightly bolder
  text-decoration: none; // Remove underline
  &:hover {
    text-decoration: underline; // Add underline on hover
  }
}
</style>