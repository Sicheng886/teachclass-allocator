<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card hover>
          <template v-slot:prepend>
            <v-icon :color="color" icon="mdi-account"></v-icon>
          </template>
          <template v-slot:title> {{ index }} - {{ props.name }} </template>
          <template v-slot:text>
            <v-row justify="space-between">
              <v-col cols="auto">
                <p class="font-weight-bold">{{ props.source }}</p>
              </v-col>
              <v-col cols="auto">
                <p class="font-weight-bold">{{ props.gender }}</p>
              </v-col>
            </v-row>
            <p>{{ props.dateOfBirth }} - 年龄：{{ age }}</p>
            <v-divider></v-divider>
            <p class="text-medium-emphasis text-caption">{{ props.note }}</p>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import dayjs from "dayjs";
const props = defineProps({
  id: {
    type: String,
    require: true,
  },
  index: Number,
  name: {
    type: String,
    require: true,
  },
  dateOfBirth: String,
  source: String,
  gender: String,
  note: String,
});

const color = computed(() => {
  if (props.source === "业主") {
    return "#1867C0";
  }
  if (props.source === "摇号") {
    return "#4CAF50";
  }

  return "#FB8C00";
});

const age = computed(() => {
  const currentYear = dayjs().year();
  // age until 09-01 current year
  const age = dayjs(`${currentYear}-09-01`).diff(
    dayjs(props.dateOfBirth),
    "year",
    true
  );
  return age.toFixed(1);
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  width: 100%;
}
</style>
