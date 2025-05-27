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
    generateRaceSchedule() {
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      const races = [];

      for (let i = 0; i < 6; i++) {
        const shuffled = [...this.horses].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10);
        races.push({
          distance: distances[i],
          horses: selected,
          results: [], // sonuçlar burada tutulacak
        });
      }
      // Pinia'ya değişiklik olduğunu bildir
      this.$patch({
        races,
        currentRaceIndex: 0,
        status: "idle",
      });
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
