<template>
  <div>
    <Search @searchResult="searchResult"></Search>
    <List :viewDesserts="viewDesserts"
          :confirmDialog="confirmDialog"
          @editOpen="editOpen"
          @addOpen="addOpen"
          @confirmOpen="confirmOpen"
          @deleteResult="deleteResult"
          @confirmCancel="confirmCancel">
    </List>
    <Form :editDialog="editDialog"
          :editedItem="editedItem"
          @saveResult="saveResult"
          @editCancel="editCancel"
          @changeTitle="changeTitle"
          @changeGenre="changeGenre"
          @changePurchaseDate="changePurchaseDate"
          @changeBuyer="changeBuyer"
          @changeReview="changeReview"
          >
    </Form>
    <v-overlay v-model="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import Vue from 'vue'
import Search from '../components/Search.vue'
import List from '../components/List.vue'
import Form from '../components/Form.vue'

const cloneDeep = require('lodash/cloneDeep')
const google = window.google
export default Vue.extend({
  components: {
    Search,
    List,
    Form
  },
  data () {
    return {
      originalDesserts: [],
      viewDesserts: [],
      editDialog: false,
      confirmDialog: false,
      overlay: false,
      deleteItemId: -1,
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
      searchTitle: '',
      searchGenre: '',
      maxId: 0
    }
  },
  created () {
    // 初期検索処理
    this.searchExec()
  },
  methods: {
    searchResult (searchTitle, searchGenre) {
      this.searchTitle = searchTitle
      this.searchGenre = searchGenre
      // 検索処理
      this.searchExec()
    },
    saveResult (isAddMode) {
      // 登録処理
      this.saveExec(isAddMode)
      // 登録・修正画面ダイアログクローズ
      this.editDialog = false
    },
    deleteResult () {
      // 削除処理
      this.deleteExec()
      // 削除確認画面ダイアログクローズ
      this.confirmDialog = false
    },
    addOpen () {
      // 選択行の内容を登録画面の項目に設定
      this.editedItem = Object.assign({}, this.defaultItem)
      // 登録画面ダイアログオープン
      this.editDialog = true
    },
    editOpen (item) {
      // 選択行の内容を修正画面の項目に設定
      this.editedItem = Object.assign({}, item)
      // 修正画面ダイアログオープン
      this.editDialog = true
    },
    editCancel () {
      // 登録・修正画面ダイアログクローズ
      this.editDialog = false
    },
    confirmOpen (item) {
      // 選択行のIDをdeleteItemIdに設定
      this.deleteItemId = item.id
      // 削除確認画面ダイアログオープン
      this.confirmDialog = true
    },
    confirmCancel () {
      // 削除確認画面ダイアログクローズ
      this.confirmDialog = false
    },
    async searchExec () {
      this.overlay = true
      try {
        const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre)
        this.viewDesserts = cloneDeep(result)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
    },
    async saveExec (isAddMode) {
      this.overlay = true
      try {
        await this.gasRun('updateBooksTable', this.editedItem, isAddMode)
        const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre)
        this.viewDesserts = cloneDeep(result)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
    },
    async deleteExec () {
      this.overlay = true
      try {
        await this.gasRun('deleteBooksTable', this.deleteItemId)
        const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre)
        this.viewDesserts = cloneDeep(result)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
    },
    changeTitle (title) {
      this.editedItem.title = title
    },
    changeGenre (genre) {
      this.editedItem.genre = genre
    },
    changePurchaseDate (purchaseDate) {
      this.editedItem.purchaseDate = purchaseDate
    },
    changeBuyer (buyer) {
      this.editedItem.buyer = buyer
    },
    changeReview (review) {
      this.editedItem.review = review
    },
    gasRun (func, ...args) {
      return new Promise(function (resolve, reject) {
        google.script.run.withSuccessHandler(function (retValue) {
          resolve(retValue)
        }).withFailureHandler(function (error) {
          reject(error)
        })[func](...args)
      }).catch(function (error) {
        throw error
      })
    }
  }
})
</script>
