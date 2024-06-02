<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <v-icon icon="mdi-school"></v-icon>
    </template>
    <v-app-bar-title>小郭老师的自动分班</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon="mdi-help" @click="showDialog = true"> </v-btn>
  </v-app-bar>

  <v-dialog v-model="showDialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-help" title="关于">
      <template v-slot:text>
        <div>
          <p class="text-body-1 my-2">
            本网页应用用于快速分班，在随机的情况下评论分配男女及大小月份进入两个班，但自主招生不会自动分配。目前暂不支持调整班级数量。
          </p>
          <p class="text-body-1 text-center my-2">
            如有疑问请联系
            <a href="mailto:skinner_box@foxmail.com">Wally Yang</a>
          </p>

          <p class="font-weight-light text-center">版本：1.0.1</p>
        </div>
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="确认" @click="showDialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const showDialog = ref(false);
</script>

<style lang="scss" scoped></style>
