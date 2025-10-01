import { defineStore } from "pinia";
import { AudioPlayer } from "@mediagrid/capacitor-native-audio";

export const useRadioStore = defineStore("radio", {
  state: () => ({
    currentStation: null,
    isPlaying: false,
    isReady: false,
    audioId: "uniqueAudioId",
    stations: [
      {
        id: 1,
        name: "Big Bang Radio",
        genre: "",
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
        genre: "",
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
        genre: "",
        streamUrl: "https://radios2.tecnosoul.com.ar:8001/txlradio",
        image: "/images/512.png",
        location: "...",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 4,
        name: "Elektrona Radio",
        genre: "",
        streamUrl: "https://radios.tecnosoul.com.ar:8001/elektrona",
        image: "/images/nova-512.png",
        location: "...",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 5,
        name: "...",
        genre: "",
        streamUrl: "https://server....",
        image: "/images/-512.png",
        location: "...",
        social: {
          instagram: "https://www.instagram.com/.../",
        },
      },
      {
        id: 6,
        name: "...",
        genre: "",
        streamUrl: "https://server....",
        image: "/images/512.png",
        location: "...",
        social: {},
      },
      {
        id: 7,
        name: "...",
        genre: "",
        streamUrl: "https://server....",
        image: "/images/one-512.png",
        location: "Neuquen",
        social: {},
      },
      {
        id: 8,
        name: "...",
        genre: "",
        streamUrl: "https://server....",
        image: "/images/512.png",
        location: "...",
        social: {},
      },
    ],
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  }),
  actions: {
    async setCurrentStation(station) {
      if (this.currentStation && this.currentStation.id === station.id) {
        // Same station, do nothing
        return;
      }
      this.currentStation = station;
      console.log("Current station set to:", station);

      // Initialize the audio player with the new station
      await this.initializeAudioPlayer();
    },

    async initializeAudioPlayer() {
      if (this.currentStation && this.currentStation.streamUrl) {
        try {
          // Destroy previous audio instance if any
          // Check if the audio player was previously initialized
          if (this.isReady) {
            await AudioPlayer.destroy({ audioId: this.audioId });
            this.isReady = false;
          }

          // Create the audio player
          await AudioPlayer.create({
            audioId: this.audioId,
            audioSource: this.currentStation.streamUrl,
            friendlyTitle: this.currentStation.name,
            useForNotification: true,
            artworkSource: this.currentStation.image,
            isBackgroundMusic: false,
            loop: false,
          });

          // Initialize the audio player
          await AudioPlayer.initialize({
            audioId: this.audioId,
          });

          // Set up event listeners
          await AudioPlayer.onPlaybackStatusChange(
            { audioId: this.audioId },
            (result) => {
              console.log("Playback status changed:", result.status);
              this.isPlaying = result.status === "playing";
            }
          );

          this.isReady = true;
        } catch (error) {
          console.error("Error initializing audio player:", error);
          this.isPlaying = false;
        }
      } else {
        console.warn("No current station or stream URL available");
        this.isPlaying = false;
      }
    },
    async play() {
      if (!this.isReady) {
        await this.initializeAudioPlayer();
      }
      try {
        await AudioPlayer.play({ audioId: this.audioId });
        this.isPlaying = true;
      } catch (error) {
        console.error("Error starting playback:", error);
        this.isPlaying = false;
      }
    },
    async pause() {
      try {
        await AudioPlayer.pause({ audioId: this.audioId });
        this.isPlaying = false;
      } catch (error) {
        console.error("Error pausing playback:", error);
      }
    },
    async togglePlay() {
      if (this.isPlaying) {
        await this.pause();
      } else {
        await this.play();
      }
    },
    toggleFavorite(station) {
      const index = this.favorites.findIndex((f) => f.id === station.id);
      if (index === -1) {
        this.favorites.push(station);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
