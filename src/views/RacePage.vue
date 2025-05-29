<template>
  <div class="race-page">
    <div class="main-section">
      <!-- 1. Sütun: Horse List -->
      <div class="sidebar">
        <h2 class="section-title">🏁 Horse List</h2>
        <table class="horse-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horse in horses" :key="horse.id">
              <td>{{ horse.id }}</td>
              <td>Horse #{{ horse.id }}</td>
              <td :style="{ color: horse.color }">{{ horse.condition }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="center-column">
        <div class="controls">
          <button class="generate-btn" @click="generateRace">
            Generate Race
          </button>
          <button v-if="races.length" class="generate-btn" @click="startRace">
            Start Race
          </button>
        </div>

        <div class="animation-track">
          <RaceAnimation
            v-if="currentRace"
            :race="currentRace"
            ref="raceAnimationRef"
          />
        </div>

        <div class="live-results" v-if="results.length > 0">
          <h2 class="section-title">📍 Live Results</h2>
          <ul class="compact-results-list">
            <li v-for="(lapResults, index) in results" :key="index">
              <strong
                >{{ index + 1 }}. Lap - {{ races[index].distance }}m</strong
              ><br />
              <span class="compact-result-line">
                <span v-for="(horse, i) in lapResults.slice(0, 10)" :key="i">
                  {{ i + 1 }}. Horse #{{ horse }}{{ i < 9 ? ", " : "" }}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="!isGenerating && races.length > 0" class="program-section">
        <h2 class="section-title">📋 RACE PROGRAM</h2>
        <ul class="program-list">
          <li v-for="(race, index) in races" :key="index">
            <strong>{{ index + 1 }}. Lap - {{ race.distance }}m:</strong>
            <span> Horses → {{ race.horses.map((h) => h.id).join(", ") }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useHorseStore } from "../db/horseStore";
import RaceAnimation from "@/components/RaceAnimation.vue";

const isGenerating = ref(false);
const results = ref([]);

const horseStore = useHorseStore();
const horses = computed(() => horseStore.horses);
const races = computed(() => horseStore.races);

const generateRace = async () => {
  isGenerating.value = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
  horseStore.generateRaceSchedule();
  isGenerating.value = false;
};

const currentRaceIndex = ref(0);
const currentRace = computed(() => races.value[currentRaceIndex.value]);
const raceAnimationRef = ref(null);

const startRace = async () => {
  results.value = [];
  for (let i = 0; i < races.value.length; i++) {
    currentRaceIndex.value = i;

    await nextTick();

    if (
      raceAnimationRef.value?.start &&
      raceAnimationRef.value?.awaitRaceFinish
    ) {
      raceAnimationRef.value.start();
      await raceAnimationRef.value.awaitRaceFinish();
    } else {
      await new Promise((res) => setTimeout(res, 4000));
    }
    // sonucu sırala
    const horseOrder = raceAnimationRef.value.getFinishOrder();
    results.value.push(horseOrder);
  }
};
</script>

<style scoped>
.race-page {
  display: flex;
  background-color: #f5f5ee;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, sans-serif;
  padding: 20px 10px;
  gap: 40px;
}

/* SIDEBAR */
.sidebar {
  padding-left: 10px;
  width: 320px;
}

.section-title {
  font-family: "Bungee", cursive;
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.horse-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.horse-table th,
.horse-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
}

.horse-table th {
  background-color: #f0f0e8;
  font-weight: bold;
}

.main-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  padding: 40px;
}
/* Ortadaki alan */
.center-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.top-button {
  margin-bottom: 10px;
  text-align: center;
}

.generate-btn {
  padding: 16px 23px;
  background-color: #ff8c42;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.generate-btn:hover {
  background-color: #e76f00;
}
.loading-text {
  flex: 1;
  text-align: center;
  font-style: italic;
  font-size: 18px;
  margin-top: 60px;
  color: #666;
}
.program-section {
  margin-top: 0;
  width: 320px;
  justify-self: end; /* en sağa yasla */
  margin-right: 0; /* sağdan 20px boşluk zaten parent’ta var */
}
.program-list {
  list-style: none;
  padding: 0;
  width: 320px;
}

.program-list li {
  margin-bottom: 15px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  word-break: break-word;
  white-space: normal;
}
.start-button {
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
}

.controls {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.live-results {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.animation-track {
  position: relative;
  margin-top: 20px;
  width: 500px;
  height: 500px;
  overflow: hidden;
  background-color: #fdfdfd;
  border: 1px dashed #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
