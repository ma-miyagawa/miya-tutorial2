<template>
  <div>
    <v-dialog
      v-model="editDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItem.title"
                    label="タイトル"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItem.genre"
                  label="ジャンル"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="6"
              >
                <v-menu
                  ref="calendarMenu"
                  v-model="calendarMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.purchaseDate"
                      label="購入日"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on:click="selectedDate = parseDate(editedItem.purchaseDate)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    no-title
                    v-on:input="calendarMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItem.buyer"
                  label="購入者"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="editedItem.review"
                  name="input-7-1"
                  label="レビュー内容"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="blue darken-1"
            tile
            v-on:click="close()"
          >
            キャンセル
          </v-btn>
          <v-btn
            class="white--text"
            color="blue darken-1"
            tile
            v-on:click="saveItem()"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">選択した書籍を削除します。よろしいでしょうか?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="blue darken-1"
            tile
            v-on:click="closeDelete()">キャンセル
          </v-btn>
          <v-btn
            class="white--text"
            color="blue darken-1"
            tile
            v-on:click="deleteItemConfirm()">はい
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: '',
      calendarMenu: false
    }
  },
  props: {
    editDialog: Boolean,
    confirmDialog: Boolean,
    editedItem: {
      title: String,
      genre: String,
      purchaseDate: String,
      buyer: String,
      review: String,
      id: Number
    }
  },
  computed: {
    formTitle () {
      return this.isAddMode ? '書籍登録' : '書籍修正'
    },
    isAddMode () {
      return this.editedItem.id === -1
    }
  },
  watch: {
    selectedDate (val) {
      this.editedItem.purchaseDate = this.formatDate(val)
    }
  },
  methods: {
    close () {
      // 登録・修正画面ダイアログクローズ
      this.$emit('editCancel')
    },
    saveItem () {
      // 更新処理
      this.$emit('saveResult', this.isAddMode)
    },
    closeDelete () {
      // 削除確認画面ダイアログクローズ
      this.$emit('confirmCancel')
    },
    deleteItemConfirm () {
      // 削除処理
      this.$emit('deleteResult')
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${year}/${month}/${day}`
    },
    parseDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
