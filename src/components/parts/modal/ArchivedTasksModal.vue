<template>
  <v-dialog class="dialog" v-model="dialog" max-width="880px" overlay-color="black" overlay-opacity="0.65">
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-layout align-center justify-space-between  class="title__wrapper">
        <v-card-title>アーカイブされたタスク</v-card-title>
      </v-layout>
      <v-tabs v-model="tab"  background-color="#56a5bf" dark>
        <v-tab v-for="(targetTitle, index) in rankedTargetsData" :key="index">{{
          targetTitle
        }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="items__wrapper">
        <v-tab-item v-for="(tasks, index) in filteredTasksData" :key="index">
          <v-list v-if="tasks.length >= 1" two-line="">
            <div v-for="(task, index) in tasks" :key="index">
            <v-list-item>
              <v-checkbox v-model="selectedTasks" :value="task"></v-checkbox>
                <v-list-item-title>{{ task.name }}</v-list-item-title>
                <v-list-item-subtitle>期日:{{ task.deadline }}</v-list-item-subtitle>
              <v-btn icon @click="isOpened(index)">
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
            </v-list-item>
            <v-expand-transition>
                  <div v-show="isOpenedIndex === index">
                    <v-card-text v-if="task.memo">
                      {{ task.memo }}
                    </v-card-text>
                    <v-card-text v-else>
                      説明がありません
                    </v-card-text>
                  </div>
                </v-expand-transition>
            </div>
          </v-list>
          <span v-else>アーカイブされているタスクはありません</span>
        </v-tab-item>
      </v-tabs-items>
      <v-layout
        v-if="selectedTasks.length"
        justify-space-between
        align-center
        class="selected-tasks__wrapper"
      >
        <p>{{ selectedTasks.length }}件選択中</p>
        <div>
          <v-btn color="#8471e2" dark @click="handleDeleteButtonClick"
            ><v-icon>mdi-trash-can-outline</v-icon>
            削除する
          </v-btn>
          <v-btn color="#ff7e2f" class="return__button" dark @click="handleReturnButtonClick">タスクに戻す</v-btn>
        </div>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
import store from "../../../store";
export default {
  name: "ArchivedTasksModal",
  data: () => ({
    dialog: false,
    tab: null,
    tasks: [[], [], [], []],
    targetTitles: [],
    selectedTasks: [],
    show: false,
    isOpenedIndex: ""
  }),
  props: ["tasksData", "targetsData"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    isOpened(index) {
      if (this.isOpenedIndex !== index) {
        this.isOpenedIndex = index;
      } else if (this.isOpenedIndex === index) {
        this.isOpenedIndex = "";
      }
    },
    handleDeleteButtonClick() {
      this.selectedTasks.forEach(function(task) {
        store.commit("deleteTaskData", task);
      });
      this.selectedTasks.splice(0, this.selectedTasks.length);
    },
    handleReturnButtonClick() {
      this.selectedTasks.forEach(function(task) {
        const data = { inputData: task, status: "doing" };
        store.commit("changeTaskStatus", data);
      });
      this.selectedTasks.splice(0, this.selectedTasks.length);
    }
  },
  watch: {},
  computed: {
    rankedTargetsData() {
      const data = [
        this.targetsData[0].name,
        this.targetsData[1].name,
        this.targetsData[2].name,
        this.targetsData[3].name
      ];
      return data;
    },
    filteredTasksData() {
      const rankedTasks = [];
      const archivedTasks1 = this.tasksData[0].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks2 = this.tasksData[1].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks3 = this.tasksData[2].filter(function(task) {
        return task.status === "archived";
      });
      const archivedTasks4 = this.tasksData[3].filter(function(task) {
        return task.status === "archived";
      });
      rankedTasks.push(archivedTasks1, archivedTasks2, archivedTasks3, archivedTasks4);
      return rankedTasks;
    }
  }
};
</script>
<style lang="scss" scoped>

.items__wrapper {
  max-height: 450px;
  overflow-y: scroll;
  height: 450px !important;
}

.v-card {
  min-height: 500px;
}
.v-application p {
  font-size: 18px;
  color: #f3f5f9;
}
.v-list-item{
}
.v-list-item .v-list-item__title{
  line-height: 19px !important;
}
::v-deep .v-input__slot{
  margin-bottom: 0px !important;
}
.selected-tasks__wrapper {
  width: 100%;
  height: 55px;
  padding: 0px 10px;
  background-color: $primary;
  position: absolute;
  bottom: 0;
}
.title__wrapper{
background:$primary;
color:white
}
.return__button{
  margin-left:20px
}
</style>
