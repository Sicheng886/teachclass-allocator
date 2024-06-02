<template>
  <v-btn
    @click="showResetDialog = true"
    color="warning"
    prepend-icon="mdi-update"
    >重置存档</v-btn
  >

  <v-dialog v-model="showResetDialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
      text="点击确认将会永久清除分班结果，建议先保存"
      title="重置存档确认"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="确认" @click="resetHandler"></v-btn>
        <v-btn
          class="ms-auto"
          text="取消"
          color="primary"
          @click="showResetDialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/app.js";
const store = useAppStore();

const showResetDialog = ref(false);

const resetHandler = () => {
  showResetDialog.value = false;
  store.$reset();
};
</script>

<style lang="scss" scoped></style>
