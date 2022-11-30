<template>
  <div>
    <v-container fluid>
      <v-row class="align-center">
        <v-col
          class="d-flex"
          cols="6"
        >
          <v-text-field
            label="タイトル"
            v-model="searchTitle"
            solo
          ></v-text-field>
        </v-col>
        <v-col
          class="d-flex"
          cols="4"
        >
          <v-text-field
            label="ジャンル"
            v-model="searchGenre"
            solo
          ></v-text-field>
        </v-col>
        <v-col
          class="d-flex"
          cols="2"
        >
          <v-btn
            tile
            color="light-blue"
            style="top: -12px"
            v-on:click="searchItem()"
          >
            <v-icon left>
              mdi-magnify
            </v-icon>
              検索
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="viewDesserts"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-spacer></v-spacer>
          <v-dialog
            v-model="editDialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  mdi-arrow-up-bold-box-outline
                </v-icon>
                  追加
              </v-btn>
            </template>
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
                  color="blue darken-1"
                  tile
                  v-on:click="close(item)"
                >
                  キャンセル
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  tile
                  v-on:click="saveItem(item)"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">選択した書籍を削除します。よろしいでしょうか?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  tile
                  v-on:click="closeDelete">キャンセル
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  tile
                  v-on:click="deleteItemConfirm">はい
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.update`]="{ item }">
        <v-btn
          tile
          color="secondary"
          v-on:click="editItem(item)"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          更新
        </v-btn>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn
          tile
          color="success"
          v-on:click="deleteItem(item)"
        >
          <v-icon left>
            mdi-delete
          </v-icon>
          削除
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const cloneDeep = require('lodash/cloneDeep')
export default {
  data () {
    return {
      editDialog: false,
      deleteDialog: false,
      searchTitle: '',
      searchGenre: '',
      headers: [
        { text: 'タイトル', align: 'start', sortable: false, value: 'title', width: '30%' },
        { text: 'ジャンル', align: 'start', sortable: false, value: 'genre', width: '20%' },
        { text: '購入日', align: 'start', sortable: false, value: 'purchaseDate', width: '15%' },
        { text: '購入者', align: 'start', sortable: false, value: 'buyer', width: '15%' },
        { text: '更新', sortable: false, value: 'update', width: '5%' },
        { text: '削除', sortable: false, value: 'delete', width: '5%' }
      ],
      viewDesserts: [],
      originalDesserts: [],
      editedItem: {
        title: '',
        genre: '',
        purchaseDate: '',
        buyer: '',
        review: '',
        id: -1
      },
      defaultItem: {
        title: '',
        genre: '',
        purchaseDate: '',
        buyer: '',
        review: '',
        id: -1
      },
      selectedDate: '',
      calendarMenu: false
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
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.viewDesserts = [
        { title: 'タイトル１', genre: 'ジャンル１', purchaseDate: '2022/11/11', buyer: '宮川', review: 'AAAA1', id: 0 },
        { title: 'タイトル２', genre: 'ジャンル１', purchaseDate: '2022/11/12', buyer: '松尾', review: 'AAAA2', id: 1 },
        { title: 'タイトル３', genre: 'ジャンル２', purchaseDate: '2022/11/13', buyer: '嶋田', review: 'AAAA3', id: 2 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/14', buyer: '横山', review: 'AAAA4', id: 3 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/15', buyer: '轟', review: 'AAAA5', id: 4 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/16', buyer: '野瀬', review: 'AAAA6', id: 5 },
        { title: 'タイトル２', genre: 'ジャンル２', purchaseDate: '2022/11/17', buyer: '西埜', review: 'AAAA7', id: 6 }
      ]
      // DBから取得した全データ作成
      this.originalDesserts = cloneDeep(this.viewDesserts)
    },
    searchItem () {
      // 初期化
      this.viewDesserts.splice(-this.viewDesserts.length)
      // DBから取得した全データを取得
      let searchDesserts = cloneDeep(this.originalDesserts)
      // フィルター
      if (this.searchTitle.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.title === this.searchTitle)
      }
      if (this.searchGenre.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.genre.indexOf(this.searchGenre) !== -1)
      }
      // 表示データ設定
      this.viewDesserts = cloneDeep(searchDesserts)
    },
    editItem (item) {
      // 選択行の内容を修正画面の項目に設定
      this.editedItem = Object.assign({}, item)
      // 修正画面ダイアログオープン
      this.editDialog = true
    },
    deleteItem (item) {
      // 選択行の内容を修正画面の項目に設定
      this.editedItem = Object.assign({}, item)
      // 削除確認画面ダイアログオープン
      this.deleteDialog = true
    },
    deleteItemConfirm () {
      // DBから対象行を削除
      let idx = this.originalDesserts.findIndex((originalDessert) => originalDessert.id === this.editedItem.id)
      this.originalDesserts.splice(idx, 1)
      // 再検索相当処理
      this.searchItem()
      // 閉じる
      this.closeDelete()
    },
    close () {
      // 新規登録／修正画面ダイアログクローズ
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    closeDelete () {
      // 削除確認画面ダイアログクローズ
      this.deleteDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    saveItem () {
      if (this.isAddMode) {
        // 新規登録の場合(idは最後のレコードのid + 1)
        if (this.originalDesserts.length === 0) {
          this.editedItem.id = 0
        } else {
          this.editedItem.id = this.originalDesserts[this.originalDesserts.length - 1].id + 1
        }
        this.originalDesserts.push(this.editedItem)
      } else {
        // 修正の場合
        Object.assign(this.originalDesserts[this.editedItem.id], this.editedItem)
      }
      // 再検索相当処理
      this.searchItem()
      // 閉じる
      this.close()
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
