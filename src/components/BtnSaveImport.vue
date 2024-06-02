<template>
  <v-btn prepend-icon="mdi-export" @click="showDialog = true">导入存档</v-btn>

  <v-dialog v-model="showDialog" width="auto">
    <v-card max-width="800" prepend-icon="mdi-update" title="导入存档">
      <template v-slot:text>
        <v-file-input
          label="上传存档"
          v-model="file"
          accept=".json"
        ></v-file-input>
        <p>导入之前导出的存档</p>
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="确认" @click="fileHandler"></v-btn>
        <v-btn
          class="ms-auto"
          text="取消"
          color="primary"
          @click="showDialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/app.js";
const store = useAppStore();

const showDialog = ref(false);
const file = ref();
const fileHandler = async () => {
  const fileValue = file.value;
  if (!fileValue) {
    alert("请添加文件");
    showDialog.value = false;
    return;
  }
  /* get raw data */
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      const txt = reader.result;
      const json = JSON.parse(txt);
      store.importSave(json);
    },
    false
  );
  console.log(fileValue);
  reader.readAsText(fileValue);
  showDialog.value = false;
};
</script>

<style lang="scss" scoped></style>
