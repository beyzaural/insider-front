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
        }"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, nextTick, defineExpose } from "vue";

const props = defineProps({
  race: {
    type: Object,
    required: true,
  },
});

const positions = ref([]);
const raceDoneResolver = ref(null);
let interval = null;

// Start fonksiyonu elle çağrılacak
async function start() {
  if (!props.race || !props.race.horses) return;

  const maxHorseId = Math.max(...props.race.horses.map((h) => h.id));
  positions.value = Array(maxHorseId).fill(0);

  await nextTick(); // DOM güncellensin

  interval = setInterval(() => {
    positions.value = positions.value.map((pos) =>
      Math.min(pos + Math.random() * 5, 95)
    );
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
function getPosition(horseId) {
  const value = positions.value[horseId - 1];
  return value ?? 0;
}

defineExpose({ start, awaitRaceFinish, getPosition });
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
