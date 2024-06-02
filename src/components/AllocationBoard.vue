<template>
  <div class="wrapper">
    <v-row>
      <v-col>
        <div class="class-wrapper">
          <h2>
            未分班 - 共计{{
              store.unallocatedMeta.numMale + store.unallocatedMeta.numFemale
            }}
          </h2>
          <v-row>
            <v-col>
              <p>男：{{ store.unallocatedMeta.numMale }}</p>
              <p>女：{{ store.unallocatedMeta.numFemale }}</p>
            </v-col>
            <v-col>
              <p>大月份：{{ store.unallocatedMeta.numBigMonth }}</p>
              <p>小月份：{{ store.unallocatedMeta.numLilMonth }}</p>
            </v-col>
          </v-row>
          <VueDraggable
            class="drag-canvas unallocated"
            v-model="store.unallocatedList"
            animation="150"
            ghostClass="ghost"
            group="people"
          >
            <student-card
              v-for="(item, index) in store.unallocatedList"
              :key="item.id"
              :name="item.name"
              :id="item.id"
              :gender="item.gender"
              :dateOfBirth="item.dob"
              :source="item.source"
              :note="item.note"
              :index="index + 1"
            />
          </VueDraggable>
        </div>
      </v-col>
      <v-col>
        <div class="class-wrapper">
          <h2>
            小1班 - 共计{{
              store.class1Meta.numMale + store.class1Meta.numFemale
            }}
          </h2>
          <v-row>
            <v-col>
              <p>男：{{ store.class1Meta.numMale }}</p>
              <p>女：{{ store.class1Meta.numFemale }}</p>
            </v-col>
            <v-col>
              <p>大月份：{{ store.class1Meta.numBigMonth }}</p>
              <p>小月份：{{ store.class1Meta.numLilMonth }}</p>
            </v-col>
          </v-row>
          <VueDraggable
            class="drag-canvas"
            v-model="store.class1List"
            animation="150"
            group="people"
            ghostClass="ghost"
          >
            <student-card
              v-for="(item, index) in store.class1List"
              :key="item.id"
              :name="item.name"
              :id="item.id"
              :gender="item.gender"
              :dateOfBirth="item.dob"
              :source="item.source"
              :note="item.note"
              :index="index + 1"
            />
          </VueDraggable>
        </div>
      </v-col>
      <v-col>
        <div class="class-wrapper">
          <h2>
            小2班 - 共计{{
              store.class2Meta.numMale + store.class2Meta.numFemale
            }}
          </h2>
          <v-row>
            <v-col>
              <p>男：{{ store.class2Meta.numMale }}</p>
              <p>女：{{ store.class2Meta.numFemale }}</p>
            </v-col>
            <v-col>
              <p>大月份：{{ store.class2Meta.numBigMonth }}</p>
              <p>小月份：{{ store.class2Meta.numLilMonth }}</p>
            </v-col>
          </v-row>
          <VueDraggable
            class="drag-canvas"
            v-model="store.class2List"
            animation="150"
            group="people"
            ghostClass="ghost"
          >
            <student-card
              v-for="(item, index) in store.class2List"
              :key="item.id"
              :name="item.name"
              :id="item.id"
              :gender="item.gender"
              :dateOfBirth="item.dob"
              :source="item.source"
              :note="item.note"
              :index="index + 1"
            />
          </VueDraggable>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
import { useAppStore } from "@/stores/app.js";
const store = useAppStore();
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;

  .drag-canvas {
    min-height: 500px;
    background: #ebebeb;
  }

  .unallocated {
    background: #ccc;
  }
}
</style>
