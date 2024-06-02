<template>
  <v-btn prepend-icon="mdi-printer" @click="printHandler">打印结果</v-btn>
</template>

<script setup>
import * as XLSX from "xlsx";
import { useAppStore } from "@/stores/app.js";
const store = useAppStore();

const printHandler = () => {
  const class1 = store.class1List.map((entry, index) => {
    return {
      序号: index + 1,
      姓名: entry.name,
      出生日期: entry.dob,
      生源: entry.source,
    };
  });
  const class2 = store.class2List.map((entry, index) => {
    return {
      序号: index + 1,
      姓名: entry.name,
      出生日期: entry.dob,
      生源: entry.source,
    };
  });

  const unallocated = store.unallocatedList.map((entry, index) => {
    return {
      序号: index + 1,
      姓名: entry.name,
      出生日期: entry.dob,
      生源: entry.source,
    };
  });

  const sheet1 = XLSX.utils.json_to_sheet(class1);
  const sheet2 = XLSX.utils.json_to_sheet(class2);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet1, "小1班");
  XLSX.utils.book_append_sheet(workbook, sheet2, "小2班");

  if (unallocated.length) {
    const unallocatedSheet = XLSX.utils.json_to_sheet(unallocated);
    XLSX.utils.book_append_sheet(workbook, unallocatedSheet, "未分配");
  }
  XLSX.writeFile(workbook, "分班结果.xlsx");
};
</script>

<style lang="scss" scoped></style>
