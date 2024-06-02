// Utilities
import dayjs from "dayjs";
import { defineStore } from "pinia";

const calcClassMeta = (classList) => {
  let numMale = 0;
  let numFemale = 0;
  let numBigMonth = 0;
  let numLilMonth = 0;

  classList.forEach((entry) => {
    if (entry.gender === "男") {
      numMale++;
    } else {
      numFemale++;
    }
    const currentYear = dayjs().year();
    // age until 09-01 current year
    const age = dayjs(`${currentYear}-09-01`).diff(
      dayjs(entry.dob),
      "year",
      true
    );
    if (age > 3.5) {
      numBigMonth++;
    } else {
      numLilMonth++;
    }
  });

  return { numMale, numFemale, numBigMonth, numLilMonth };
};

const allocate = (toAllocateList, classList1, classList2) => {
  if (toAllocateList.length && toAllocateList.length === 1) {
    if (Math.random() > 0.5) {
      classList1.push(toAllocateList[0]);
      return;
    }
    classList2.push(toAllocateList[0]);
    return;
  }
  if (toAllocateList.length && toAllocateList.length > 1) {
    const midIndex = Math.floor(toAllocateList.length / 2);
    const list1 = toAllocateList.slice(0, midIndex);
    const list2 = toAllocateList.slice(midIndex);

    if (Math.random() > 0.5) {
      classList1.push(...list1);
      classList2.push(...list2);
      return;
    }
    classList2.push(...list1);
    classList1.push(...list2);
    return;
  }
};

export const useAppStore = defineStore("app", {
  state: () => ({
    //
    unallocatedList: [],
    class1List: [],
    class2List: [],
  }),
  getters: {
    allState: (state) => {
      return JSON.parse(
        JSON.stringify({
          unallocatedList: state.unallocatedList,
          class1List: state.class1List,
          class2List: state.class2List,
        })
      );
    },
    totalStudent: (state) => {
      const unallocatedList = state.unallocatedList.map((item) => {
        return { ...item, allocate: "未分班", belongTo: "unallocatedList" };
      });
      const class1List = state.class1List.map((item) => {
        return { ...item, allocate: "小1班", belongTo: "class1List" };
      });
      const class2List = state.class2List.map((item) => {
        return { ...item, allocate: "小2班", belongTo: "class2List" };
      });

      const list = [...unallocatedList, ...class1List, ...class2List];
      const meta = calcClassMeta(list);
      return { meta, list };
    },
    unallocatedMeta: (state) => {
      return calcClassMeta(state.unallocatedList);
    },
    class1Meta: (state) => {
      return calcClassMeta(state.class1List);
    },
    class2Meta: (state) => {
      return calcClassMeta(state.class2List);
    },
  },

  actions: {
    mergeStudent(newList) {
      this.unallocatedList.push(...newList);
    },
    importSave(save) {
      const { unallocatedList, class1List, class2List } = save;
      this.unallocatedList = unallocatedList;
      this.class1List = class1List;
      this.class2List = class2List;
    },
    arrangeClass() {
      const needAllocateStudent = [];
      this.unallocatedList = this.unallocatedList.filter((entry) => {
        const isSpecial = entry.source === "自主招生";
        if (isSpecial) {
          return true;
        }
        needAllocateStudent.push(entry);
        return;
      });

      needAllocateStudent.sort(() => Math.random() - 0.5);
      console.log(needAllocateStudent);
      const bigMonthMale = [];
      const bigMonthFemale = [];
      const smallMonthMale = [];
      const smallMonthFemale = [];
      needAllocateStudent.forEach((entry) => {
        const currentYear = dayjs().year();
        // age until 09-01 current year
        const age = dayjs(`${currentYear}-09-01`).diff(
          dayjs(entry.dob),
          "year",
          true
        );
        if (age > 3.5) {
          if (entry.gender === "男") {
            bigMonthMale.push(entry);
            return;
          }
          bigMonthFemale.push(entry);
          return;
        }

        if (entry.gender === "男") {
          smallMonthMale.push(entry);
          return;
        }
        smallMonthFemale.push(entry);
        return;
      });

      allocate(bigMonthMale, this.class1List, this.class2List);
      allocate(smallMonthMale, this.class1List, this.class2List);
      allocate(bigMonthFemale, this.class1List, this.class2List);
      allocate(smallMonthFemale, this.class1List, this.class2List);
    },
  },
  persist: true,
});
