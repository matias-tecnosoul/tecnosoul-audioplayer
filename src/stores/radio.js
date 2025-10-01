// src/stores/radio.js
import { defineStore } from "pinia";
import { Capacitor } from "@capacitor/core";

// Only import AudioPlayer on native platforms
let AudioPlayer = null;
if (Capacitor.isNativePlatform()) {
  import("@mediagrid/capacitor-native-audio").then((module) => {
    AudioPlayer = module.AudioPlayer;
  });
}

export const useRadioStore = defineStore("radio", {
  state: () => ({
    currentStation: null,
    isPlaying: false,
    isReady: false,
    isLoading: false,
    error: null,
    audioId: "radioStream",
    // Browser fallback audio element
    browserAudio: null,
    isNative: Capacitor.isNativePlatform(),
    stations: [
      {
        id: 1,
        name: "Big Bang Radio",
        genre: "Variado",
        streamUrl: "https://radios2.tecnosoul.com.ar:8001/bigbang",
        image: "/images/la-512.png",
        location: "Bs. As.",
        social: {
          instagram: "https://www.instagram.com/test/",
          whatsapp: "https://wa.me/54333/",
        },
      },
      {
        id: 2,
        name: "Guayra Radio",
        genre: "Variado",
        streamUrl: "https://radios2.tecnosoul.com.ar:8001/guayraradio",
        image: "/images/512.png",
        location: "Misiones",
        social: {
          instagram: "https://www.instagram.com/aaa",
        },
      },
      {
        id: 3,
        name: "TXL Radio",
        genre: "Variado",
        streamUrl: "https://radios2.tecnosoul.com.ar:8001/txlradio",
        image: "/images/512.png",
        location: "Argentina",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 4,
        name: "Elektrona Radio",
        genre: "Electrónica",
        streamUrl: "https://radios.tecnosoul.com.ar:8001/elektrona",
        image: "/images/nova-512.png",
        location: "Argentina",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 5,
        name: "Radio 5",
        genre: "Variado",
        streamUrl: "https://server....",
        image: "/images/-512.png",
        location: "Argentina",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 6,
        name: "Radio 6",
        genre: "Variado",
        streamUrl: "https://server....",
        image: "/images/512.png",
        location: "Argentina",
        social: {},
      },
      {
        id: 7,
        name: "Radio 7",
        genre: "Variado",
        streamUrl: "https://server....",
        image: "/images/one-512.png",
        location: "Neuquen",
        social: {},
      },
      {
        id: 8,
        name: "Radio 8",
        genre: "Variado",
        streamUrl: "https://server....",
        image: "/images/512.png",
        location: "Argentina",
        social: {},
      },
    ],
    favorites: [],
  }),

  actions: {
    async setCurrentStation(station) {
      if (this.currentStation && this.currentStation.id === station.id) {
        return; // Same station, do nothing
      }

      console.log("Setting current station to:", station.name);
      this.currentStation = station;
      this.error = null;

      // Initialize the audio player with the new station
      await this.initializeAudioPlayer();
    },

    async initializeAudioPlayer() {
      if (!this.currentStation || !this.currentStation.streamUrl) {
        console.warn("No current station or stream URL available");
        this.error = "No hay estación seleccionada";
        return;
      }

      this.isLoading = true;
      this.error = null;

      // Browser fallback
      if (!this.isNative) {
        console.log("Browser mode: Using HTML5 Audio");
        await this.initializeBrowserAudio();
        return;
      }

      // Native mode
      try {
        // Destroy previous audio instance if any
        if (this.isReady) {
          console.log("Destroying previous audio player instance");
          try {
            await AudioPlayer.destroy({ audioId: this.audioId });
          } catch (err) {
            console.warn("Error destroying previous instance:", err);
          }
          this.isReady = false;
          this.isPlaying = false;
        }

        console.log("Creating native audio player for:", this.currentStation.streamUrl);

        // Create the audio player
        await AudioPlayer.create({
          audioId: this.audioId,
          audioSource: this.currentStation.streamUrl,
          friendlyTitle: this.currentStation.name,
          useForNotification: true,
          artworkSource: this.currentStation.image,
          isBackgroundMusic: true,
          loop: false,
        });

        console.log("Initializing native audio player");

        // Initialize the audio player
        await AudioPlayer.initialize({
          audioId: this.audioId,
        });

        // Set up event listeners
        console.log("Setting up playback status listener");
        await AudioPlayer.onPlaybackStatusChange(
          { audioId: this.audioId },
          (result) => {
            console.log("Playback status changed:", result.status);
            this.isPlaying = result.status === "playing";

            if (result.status === "error") {
              this.error = "Error al reproducir la estación";
              this.isPlaying = false;
            }
          }
        );

        // Set up audio ready listener
        await AudioPlayer.onAudioReady({ audioId: this.audioId }, () => {
          console.log("Audio is ready");
          this.isReady = true;
          this.isLoading = false;
        });

        this.isReady = true;
        this.isLoading = false;
        console.log("Native audio player initialized successfully");
      } catch (error) {
        console.error("Error initializing native audio player:", error);
        this.error = "No se pudo inicializar el reproductor";
        this.isPlaying = false;
        this.isReady = false;
        this.isLoading = false;
      }
    },

    async initializeBrowserAudio() {
      try {
        // Clean up previous audio if exists
        if (this.browserAudio) {
          this.browserAudio.pause();
          this.browserAudio.src = "";
          this.browserAudio = null;
        }

        // Create HTML5 Audio element
        this.browserAudio = new Audio(this.currentStation.streamUrl);
        this.browserAudio.preload = "none";

        // Set up event listeners
        this.browserAudio.addEventListener("playing", () => {
          console.log("Browser audio playing");
          this.isPlaying = true;
          this.isLoading = false;
        });

        this.browserAudio.addEventListener("pause", () => {
          console.log("Browser audio paused");
          this.isPlaying = false;
        });

        this.browserAudio.addEventListener("error", (e) => {
          console.error("Browser audio error:", e);
          this.error = "Error al reproducir en el navegador";
          this.isPlaying = false;
          this.isLoading = false;
        });

        this.browserAudio.addEventListener("canplay", () => {
          console.log("Browser audio ready");
          this.isReady = true;
          this.isLoading = false;
        });

        this.isReady = true;
        this.isLoading = false;
        console.log("Browser audio initialized");
      } catch (error) {
        console.error("Error initializing browser audio:", error);
        this.error = "No se pudo inicializar el reproductor";
        this.isLoading = false;
      }
    },

    async play() {
      if (!this.currentStation) {
        console.warn("No station selected");
        return;
      }

      if (!this.isReady) {
        console.log("Audio not ready, initializing first");
        await this.initializeAudioPlayer();
      }

      try {
        console.log("Starting playback");

        if (this.isNative && AudioPlayer) {
          await AudioPlayer.play({ audioId: this.audioId });
        } else if (this.browserAudio) {
          await this.browserAudio.play();
        }

        this.isPlaying = true;
        this.error = null;
      } catch (error) {
        console.error("Error starting playback:", error);
        this.error = "Error al reproducir";
        this.isPlaying = false;
      }
    },

    async pause() {
      if (!this.isReady) {
        console.warn("Cannot pause: audio player not ready");
        return;
      }

      try {
        console.log("Pausing playback");

        if (this.isNative && AudioPlayer) {
          await AudioPlayer.pause({ audioId: this.audioId });
        } else if (this.browserAudio) {
          this.browserAudio.pause();
        }

        this.isPlaying = false;
      } catch (error) {
        console.error("Error pausing playback:", error);
        this.error = "Error al pausar";
      }
    },

    async togglePlay() {
      if (this.isPlaying) {
        await this.pause();
      } else {
        await this.play();
      }
    },

    async stop() {
      if (!this.isReady) {
        return;
      }

      try {
        console.log("Stopping playback");

        if (this.isNative && AudioPlayer) {
          await AudioPlayer.stop({ audioId: this.audioId });
        } else if (this.browserAudio) {
          this.browserAudio.pause();
          this.browserAudio.currentTime = 0;
        }

        this.isPlaying = false;
      } catch (error) {
        console.error("Error stopping playback:", error);
      }
    },

    toggleFavorite(station) {
      const index = this.favorites.findIndex((f) => f.id === station.id);
      if (index === -1) {
        this.favorites.push(station);
      } else {
        this.favorites.splice(index, 1);
      }
      // TODO: Replace with Capacitor Preferences API
    },

    clearError() {
      this.error = null;
    },
  },

  getters: {
    isFavorite: (state) => (stationId) => {
      return state.favorites.some((f) => f.id === stationId);
    },
    platformInfo: (state) => {
      return state.isNative ? "Native (Android/iOS)" : "Browser";
    },
  },
});