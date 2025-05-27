import { defineStore } from "pinia";

export const useHorseStore = defineStore("horse", {
  state: () => ({
    horses: [],
    races: [],
    currentRaceIndex: 0,
    status: "idle", // idle | running | finished
  }),

  actions: {
    generateHorses() {
      this.horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        color: this.getRandomColor(),
        condition: Math.floor(Math.random() * 100) + 1,
      }));
    },
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
});
