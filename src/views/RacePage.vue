<template>
  <div class="race-page">
    <!-- SIDEBAR -->
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

    <!-- MAIN SECTION -->
    <div class="main-section">
      <!-- Generate Race Button -->
      <div class="top-button">
        <button class="generate-btn" @click="generateRace">
          Generate Race
        </button>
      </div>

      <!-- program-section -->
      <div v-if="races.length === 0" class="loading-text">
        Generating race program...
      </div>

      <!-- RACE PROGRAM (appear after click) -->
      <div v-if="races.length > 0" class="program-section">
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
import { useHorseStore } from "../db/horseStore";
const horseStore = useHorseStore();
const horses = horseStore.horses;
const races = horseStore.races;

const generateRace = () => {
  console.log("Generating race...");
  horseStore.generateRaceSchedule();
};
</script>

<style scoped>
.race-page {
  display: flex;
  background-color: #f5f5ee;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, sans-serif;
  padding: 40px 10px;
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

/* MAIN SECTION */
.main-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* sağa yasla */
  position: relative;
  padding-right: 60px;
}

.top-button {
  margin-bottom: 10px;
  text-align: center;
}

.generate-btn {
  padding: 12px 23px;
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

/* PROGRAM SECTION */
.program-section {
  width: 100%;
  max-width: 400px;
  align-self: flex-end;
}

.program-list {
  list-style: none;
  padding: 0;
}

.program-list li {
  margin-bottom: 15px;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  word-break: break-word;
  white-space: normal;
}
</style>
