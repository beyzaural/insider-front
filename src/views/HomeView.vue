<template>
  <div id="home">
    <h1 class="main-title">🏇 Horse Racing Game</h1>
    <p class="subtext">Choose your favorite and get ready to race!</p>

    <button class="generate-btn" @click="goToRace">Generate Horses</button>

    <!-- Scrollable horse cards -->
    <div class="scroll-container">
      <div class="scroll-inner">
        <div
          class="horse-card"
          v-for="(horse, index) in horseImages"
          :key="index"
        >
          <img :src="horse.src" :alt="horse.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useHorseStore } from "../db/horseStore";

const router = useRouter();
const horseStore = useHorseStore();

const goToRace = () => {
  horseStore.generateHorses();
  router.push("/race");
};

const horseImages = [
  { name: "MIRAN", src: "/horses/horse1.png" },
  { name: "BATUR", src: "/horses/horse2.png" },
  { name: "KARA", src: "/horses/horse3.png" },
  { name: "DEMİR", src: "/horses/horse4.png" },
  { name: "YILDIZ", src: "/horses/horse5.png" },
  { name: "DÜLDÜL", src: "/horses/horse6.png" },
];
</script>

<style scoped>
#home {
  text-align: center;
}
/* Aynı CSS’leri buraya taşıyabilirsin */

.main-title {
  font-family: "Bungee", cursive;
  font-size: 64px;
  margin-top: 100px;
  color: #333;
}
.subtext {
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
}
.generate-btn {
  padding: 12px 24px;
  font-size: 18px;
  background-color: #ff8c42;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 20px 0;
}
.generate-btn:hover {
  background-color: #e76f00;
}
.scroll-container {
  overflow-x: auto;
  padding: 10px 0;
  margin-top: 120px;
  margin-bottom: 20px;
}
.scroll-inner {
  display: flex;
  gap: 20px;
  padding: 0 20px;
  width: max-content;
}
.horse-card {
  width: 320px;
  height: 320px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}
.horse-card:hover {
  transform: scale(1.05);
}
.horse-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
