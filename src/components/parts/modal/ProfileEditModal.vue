<template>
  <v-dialog v-model="dialog" fullscreen max-width="600px" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }"> </template>
    <v-card>
      <v-app-bar  class="header">
          <v-layout justify-space-around align-center>
          <v-layout align-center>
        <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
              <v-card-title>
        <span class="headline">プロフィールを編集</span>
      </v-card-title>
          </v-layout>
        <v-btn text color="white" @click="handleSubmitButtonClick">保存</v-btn>
          </v-layout>
      </v-app-bar>

        <v-container>
          <v-tabs>
            <v-tab v-for="(tab, index) in tabs" :key="`tab-${index}`" :href="`#tab-${index}`">
              {{ tab }}
            </v-tab>

            <v-tab-item key="tab-0" :value="'tab-' + 0">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="inputName" label="ユーザー名"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="interestsOptions"
                    v-model="inputItems"
                    label="興味のある分野"
                    multiple
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    label="写真を選択"
                    filled
                    ref="imageFile"
                    @change="selectFile"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item key="tab-1" :value="'tab-' + 1">
              <v-col cols="12">
                <v-card-text>パスワードの再設定</v-card-text>
                <v-text-field label="メールアドレス"></v-text-field>
              </v-col>
            </v-tab-item>
          </v-tabs>
        </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ProfileEditModal",
  data: () => ({
    dialog: false,
    tabs: ["プロフィール", "個人情報"],
    inputName: '',
    inputItems: [],
    interestsOptions: ["語学学習", "プログラミング"],
    inputImage: ""
  }),
  props: ["userName"],
  methods: {
    openDialog() {
      this.dialog = true;
    },
    selectFile(event) {
      this.inputImage = event;
    },
    handleSubmitButtonClick() {
      this.$emit("submit", this.inputName, this.inputItems, this.inputImage);
      this.dialog = false;
    }
  },
  computed: {
  },
  mounted:function() {
    this.inputName = this.userName
  }
};
</script>

<style scoped lang="scss">

.header{
  display: flex;
  background:$secondary;
  color:white;
}
.v-toolbar__content{
  width:100vw !important
}
.v-sheet{
  border-radius:0px !important
}
</style>
