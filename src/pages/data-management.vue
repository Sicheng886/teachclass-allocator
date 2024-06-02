<template>
  <div>
    <header class="header">
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-row justify="end">
            <v-col cols="auto">
              <div class="text-h3">数据管理</div>
            </v-col>
            <v-col cols="auto">
              <v-btn prepend-icon="mdi-school" @click="router.push('/')"
                >班级管理
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <btn-save-export />
            </v-col>
            <v-col cols="auto"> <btn-save-import /> </v-col>
          </v-row>
        </v-col>

        <v-col cols="auto">
          <v-row justify="end">
            <v-col cols="auto"> <btn-save-reset /> </v-col>
          </v-row>
        </v-col>
      </v-row>
    </header>

    <div class="container">
      <aside>
        <v-row>
          <v-col>
            <v-file-input
              label="上传学生名单"
              v-model="file"
              accept=".xls, .xlsx"
            ></v-file-input
          ></v-col>
          <v-col cols="auto">
            <v-btn @click="uploadHandler" prepend-icon="mdi-upload">
              上传
            </v-btn></v-col
          >
        </v-row>

        <p>
          学生名单需要是 excel
          表格，包含列：姓名，出生日期（YYYY-MM-DD），性别（男，女），生源（业主、摇号、自主招生），备注（可选）
        </p>
      </aside>

      <main>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="createStudentHandler" prepend-icon="mdi-pencil">
              新建学生
            </v-btn></v-col
          >
        </v-row>
        <v-row>
          <v-col>
            <p>男：{{ store.totalStudent.meta.numMale }}</p>
            <p>女：{{ store.totalStudent.meta.numFemale }}</p>
          </v-col>
          <v-col>
            <p>大月份：{{ store.totalStudent.meta.numBigMonth }}</p>
            <p>小月份：{{ store.totalStudent.meta.numLilMonth }}</p>
          </v-col>
        </v-row>
        <v-table fixed-header height="800">
          <thead>
            <tr>
              <th class="text-left">姓名</th>
              <th class="text-left">出生日期</th>
              <th class="text-left">性别</th>
              <th class="text-left">生源</th>
              <th class="text-left">班级</th>
              <th class="text-left">备注</th>
              <th class="text-letf">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.totalStudent.list" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.dob }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.source }}</td>
              <td>{{ item.allocate }}</td>
              <td>{{ item.note }}</td>
              <td>
                <v-row justify="start">
                  <v-col cols="auto">
                    <v-btn
                      @click="
                        () => {
                          showEditStudentDialog = true;
                          studentInAction = item;
                        }
                      "
                      color="primary"
                      prepend-icon="mdi-pencil"
                      >编辑</v-btn
                    >
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      @click="
                        () => {
                          showRemoveStudentDialog = true;
                          studentInAction = item;
                        }
                      "
                      color="warning"
                      prepend-icon="mdi-delete"
                      >删除</v-btn
                    >
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-table>
      </main>
    </div>
  </div>

  <v-dialog v-model="showRemoveStudentDialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-delete"
      text="点击确定会永久删除学生"
      title="删除学生确认"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ms-auto"
          text="确认"
          @click="removeStudentHandler"
        ></v-btn>
        <v-btn
          class="ms-auto"
          text="取消"
          color="primary"
          @click="showRemoveStudentDialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showEditStudentDialog" width="auto">
    <v-card width="600" prepend-icon="mdi-pen" title="编辑学生">
      <template v-slot:text>
        <p>编辑学生信息</p>
        <v-text-field
          label="姓名"
          v-model="studentInAction.name"
        ></v-text-field>
        <v-text-field label="生日" v-model="studentInAction.dob"></v-text-field>
        <v-text-field
          label="班级"
          v-model="studentInAction.allocate"
          disabled
        ></v-text-field>
        <v-select
          label="性别"
          :items="['男', '女']"
          v-model="studentInAction.gender"
        ></v-select>
        <v-select
          label="生源"
          :items="['摇号', '自主招生', '业主']"
          v-model="studentInAction.source"
        ></v-select>
        <v-text-field
          label="备注"
          v-model="studentInAction.note"
        ></v-text-field>
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="确认" @click="editStudentHandler"></v-btn>
        <v-btn
          class="ms-auto"
          text="取消"
          @click="showEditStudentDialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import md5 from "md5";
import { useAppStore } from "@/stores/app.js";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useAppStore();

const file = ref();
const showRemoveStudentDialog = ref(false);
const showEditStudentDialog = ref(false);
const studentInAction = ref();

const uploadHandler = async () => {
  const data = await fileHandler(file.value);
  const duplicatedList = new Set();
  const uniqueStudent = data.filter((entry) => {
    const isUnique =
      !store.totalStudent.list.length ||
      !store.totalStudent.list.some((student) => student.name === entry.name);
    if (!isUnique) {
      duplicatedList.add(entry.name);
    }
    return isUnique;
  });
  console.log(uniqueStudent);
  store.mergeStudent(uniqueStudent);
  if (duplicatedList.size) {
    alert(
      `以下学生姓名重复：\n${[...duplicatedList.values()].join(
        ", "
      )}。\n 本次未添加，如确认确实需要添加，需在名字后面加数字。`
    );
  }
};

const fileHandler = async (file) => {
  if (!file) {
    alert("请添加文件");
    return;
  }
  /* get raw data */
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const wb = XLSX.read(data, {
    type: "binary",
    cellDates: true,
  });
  /* do something with the workbook here */
  const jsonSheet = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  const formattedList = jsonSheet.map((entry) => {
    const data = {
      name: entry["姓名"],
      dob: dayjs(entry["出生日期"]).add(1, "day").format("YYYY-MM-DD"),
      gender: entry["性别"],
      source: entry["生源"],
      note: entry["备注"],
    };

    data.id = md5(JSON.stringify(data));
    return data;
  });
  return formattedList;
};

const removeStudentHandler = () => {
  const { id, belongTo } = studentInAction.value;
  const targetIndex = store[belongTo].findIndex((entry) => entry.id === id);
  if (targetIndex < 0) {
    console.error("target student not found");
    return;
  }
  store[belongTo].splice(targetIndex, 1);
};

const editStudentHandler = () => {
  const { id, name, gender, dob, source, belongTo, note } =
    studentInAction.value;
  const targetIndex = store[belongTo].findIndex((entry) => entry.id === id);

  if (targetIndex < 0) {
    const data = {
      name,
      dob,
      gender,
      source,
      note,
    };
    data.id = md5(JSON.stringify(data));

    const isUniqueStudent =
      !store.totalStudent.length ||
      !store.totalStudent.some((student) => student.id === data.id);
    if (isUniqueStudent) {
      store.mergeStudent([data]);
      showEditStudentDialog.value = false;
    } else {
      console.error("student duplicated");
    }
    showEditStudentDialog.value = false;
  }
  store[belongTo][targetIndex] = {
    id,
    name,
    dob,
    gender,
    source,
    note,
  };

  showEditStudentDialog.value = false;
};

const createStudentHandler = () => {
  studentInAction.value = {
    name: "",
    gender: "",
    dob: "2020-01-01",
    source: "",
    allocate: "未分班",
    belongTo: "unallocatedList",
    note: "",
    id: -1,
  };

  showEditStudentDialog.value = true;
};
</script>

<style lang="scss" scoped>
.header {
  margin: 1rem;
}
.container {
  margin: 1rem;
}
</style>
