<template>
  <div>
    <Search @searchResult="searchResult"></Search>
    <List :viewDesserts="viewDesserts"
          @editOpen="editOpen"
          @addOpen="addOpen"
          @confirmOpen="confirmOpen">
    </List>
    <Form :editDialog="editDialog"
          :confirmDialog="confirmDialog"
          :editedItem="editedItem"
          @saveResult="saveResult"
          @deleteResult="deleteResult"
          @editCancel="editCancel"
          @confirmCancel="confirmCancel">
    </Form>
  </div>
</template>
<script>
import Vue from 'vue'
import Search from '../components/Search.vue'
import List from '../components/List.vue'
import Form from '../components/Form.vue'

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
      this.viewDesserts = [
        { title: 'タイトル１', genre: 'ジャンル１', purchaseDate: '2022/11/11', buyer: '宮川', review: 'AAAA1', id: 1 },
        { title: 'タイトル２', genre: 'ジャンル１', purchaseDate: '2022/11/12', buyer: '松尾', review: 'AAAA2', id: 2 },
        { title: 'タイトル３', genre: 'ジャンル２', purchaseDate: '2022/11/13', buyer: '嶋田', review: 'AAAA3', id: 3 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/14', buyer: '横山', review: 'AAAA4', id: 4 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/15', buyer: '轟', review: 'AAAA5', id: 5 },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/16', buyer: '野瀬', review: 'AAAA6', id: 6 },
        { title: 'タイトル２', genre: 'ジャンル２', purchaseDate: '2022/11/17', buyer: '西埜', review: 'AAAA7', id: 7 }
      ]
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
    }
  }
})
</script>
