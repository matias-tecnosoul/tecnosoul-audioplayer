// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ar.com.tecnosoul.audioplayer',
  appName: 'TecnoSoul Live Audio Player',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'http' // Important: prevents data loss on upgrade
  },
  plugins: {
    // Future plugin configurations go here
  }
};

export default config;