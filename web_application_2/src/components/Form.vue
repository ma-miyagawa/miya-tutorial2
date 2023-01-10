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
                  v-model="innerTitle"
                  label="タイトル"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="innerGenre"
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
                      v-model="innerPurchaseDate"
                      label="購入日"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on:click="selectedDate = parseDate(innerPurchaseDate)"
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
                  v-model="innerBuyer"
                  label="購入者"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="innerReview"
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
    },
    innerTitle: {
      get () {
        return this.$props.editedItem.title
      },
      set (val) {
        this.$emit('changeTitle', val)
      }
    },
    innerGenre: {
      get () {
        return this.$props.editedItem.genre
      },
      set (val) {
        this.$emit('changeGenre', val)
      }
    },
    innerPurchaseDate: {
      get () {
        return this.$props.editedItem.purchaseDate
      }
    },
    innerBuyer: {
      get () {
        return this.$props.editedItem.buyer
      },
      set (val) {
        this.$emit('changeBuyer', val)
      }
    },
    innerReview: {
      get () {
        return this.$props.editedItem.review
      },
      set (val) {
        this.$emit('changeReview', val)
      }
    }
  },
  watch: {
    selectedDate (val) {
      this.$emit('changePurchaseDate', this.formatDate(val))
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
