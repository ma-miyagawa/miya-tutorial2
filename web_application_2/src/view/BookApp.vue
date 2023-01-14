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
  </div>
</template>
<script>
import Vue from 'vue'
import Search from '../components/Search.vue'
import List from '../components/List.vue'
import Form from '../components/Form.vue'

import getBooksTable from '../../server/functions/execTable'
const cloneDeep = require('lodash/cloneDeep')
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
    this.initialize()
  },
  methods: {
    initialize () {
      this.viewDesserts = getBooksTable()
      this.originalDesserts = cloneDeep(this.viewDesserts)
      this.maxId = 7
    },
    searchResult (searchTitle, searchGenre) {
      this.searchTitle = searchTitle
      this.searchGenre = searchGenre
      // 検索処理
      this.viewDesserts = this.searchExec()
    },
    saveResult (isAddMode) {
      if (isAddMode) {
        // 新規登録の場合
        this.maxId += 1
        this.editedItem.id = this.maxId
        this.originalDesserts.push(this.editedItem)
      } else {
        // 修正の場合
        const idx = this.originalDesserts.findIndex((originalDessert) => originalDessert.id === this.editedItem.id)
        Object.assign(this.originalDesserts[idx], this.editedItem)
      }
      // 再検索相当処理
      this.viewDesserts = this.searchExec()
      // 登録・修正画面ダイアログクローズ
      this.editDialog = false
    },
    deleteResult () {
      // DBから対象行を削除
      const idx = this.originalDesserts.findIndex((originalDessert) => originalDessert.id === this.deleteItemId)
      this.originalDesserts.splice(idx, 1)
      // 再検索相当処理
      this.viewDesserts = this.searchExec()
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
    searchExec () {
      const cloneDeep = require('lodash/cloneDeep')
      let searchDesserts = cloneDeep(this.originalDesserts)
      // フィルター
      if (this.searchTitle.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.title === this.searchTitle)
      }
      if (this.searchGenre.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.genre.indexOf(this.searchGenre) !== -1)
      }
      return searchDesserts
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
    }
  }
})
</script>
