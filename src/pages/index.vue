<template>
  <header class="header">
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-row justify="end">
          <v-col cols="auto">
            <div class="text-h3">分班</div>
          </v-col>
          <v-col cols="auto">
            <v-btn
              prepend-icon="mdi-school"
              @click="allocateHandler"
              color="primary"
              >自动分配
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              prepend-icon="mdi-folder"
              @click="router.push('/data-management')"
              >学生管理
            </v-btn>
          </v-col>
          <v-col cols="auto"> <btn-save-export /></v-col>
          <v-col cols="auto">
            <btn-print />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="auto">
        <v-row justify="end">
          <v-col cols="auto">
            <btn-save-reset />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </header>
  <allocation-board />

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
import { useAppStore } from "@/stores/app.js";
import { useRouter } from "vue-router";
const store = useAppStore();
const router = useRouter();
const allocateHandler = () => {
  store.arrangeClass();
};
</script>

<style lang="scss" scoped>
.header {
  margin: 1rem;
}
</style>
