<template>
  <div class="race-track">
    <div class="lane" v-for="horse in props.race.horses" :key="horse.id">
      <div class="lane-number">{{ horse.id }}</div>
      <img
        class="horse"
        src="/horses/icon.png"
        :alt="`Horse ${horse.id}`"
        :style="{
          left: positions[horse.id - 1] + '%',
          filter: `brightness(0) saturate(100%) hue-rotate(${
            horseColors[horse.id]
          }deg)`,
        }"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, nextTick, defineExpose } from "vue";
let isPaused = ref(false);

function pause() {
  isPaused.value = true;
}

function resume() {
  isPaused.value = false;
}

const props = defineProps({
  race: {
    type: Object,
    required: true,
  },
});
const horseColors = ref({});
const finishTimes = ref({});

const positions = ref([]);
const raceDoneResolver = ref(null);
let interval = null;

function generateRandomColorDegrees() {
  return Math.floor(Math.random() * 360);
}

// Start fonksiyonu elle çağrılacak
async function start() {
  if (!props.race || !props.race.horses) return;
  finishTimes.value = {};

  const maxHorseId = Math.max(...props.race.horses.map((h) => h.id));
  positions.value = Array(maxHorseId).fill(0);

  props.race.horses.forEach((h) => {
    horseColors.value[h.id] = generateRandomColorDegrees();
  });

  await nextTick(); // DOM güncellensin

  interval = setInterval(() => {
    if (isPaused.value) return; // ✅ Durdurulmuşsa hiçbir şey yapma

    positions.value = positions.value.map((pos) =>
      Math.min(pos + Math.random() * 5, 95)
    );

    props.race.horses.forEach((h) => {
      const id = h.id;
      if (positions.value[id - 1] >= 90 && !finishTimes.value[id]) {
        finishTimes.value[id] = Date.now();
      }
    });

    if (positions.value.every((p) => p >= 90)) {
      clearInterval(interval);
      if (raceDoneResolver.value) raceDoneResolver.value();
    }
  }, 200);
}

function awaitRaceFinish() {
  return new Promise((resolve) => {
    raceDoneResolver.value = resolve;
  });
}
function getFinishOrder() {
  return Object.entries(finishTimes.value)
    .sort((a, b) => a[1] - b[1])
    .map(([horseId]) => parseInt(horseId));
}

defineExpose({ start, pause, resume, awaitRaceFinish, getFinishOrder });
</script>

<style scoped>
.race-track {
  position: relative;
  height: 400px;
  border: 2px dashed #ccc;
  padding-left: 50px;
}
.lane {
  position: relative;
  height: 35px;
}
.lane-number {
  position: absolute;
  left: -50px;
  width: 40px;
  height: 30px;
  background-color: green;
  color: white;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  border-radius: 5px;
}
.horse {
  position: absolute;
  height: 30px;
  width: 30px;
  object-fit: contain;
  transition: left 0.2s;
}
</style>
