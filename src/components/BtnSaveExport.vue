<template>
  <v-btn @click="exportSaveHandler" prepend-icon="mdi-import">导出存档</v-btn>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
const store = useAppStore();

const exportSaveHandler = () => {
  const jsonStr = JSON.stringify(store.allState);
  console.log(jsonStr);
  const url = window.URL || window.webkitURL || window;
  const blob = new Blob([jsonStr]);
  const saveLink = document.createElement("a");
  saveLink.href = url.createObjectURL(blob);
  saveLink.download = "save.json";
  saveLink.click();
};
</script>

<style lang="scss" scoped></style>
