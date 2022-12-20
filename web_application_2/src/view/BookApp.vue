<template>
  <div>
    <Search :originalDesserts='originalDesserts'
            @searchResult="searchResult">
    </Search>
    <List :viewDesserts='viewDesserts'
          @editOpen="editOpen"
          @confirmOpen="confirmOpen">
    </List>
    <Form :editDialog='editDialog'
          :confirmDialog='confirmDialog'
          :deleteItemId='deleteItemId'
          :editedItem='editedItem'
          :originalDesserts='originalDesserts'
          :searchTitle='searchTitle'
          :searchGenre='searchGenre'
          :maxId='maxId'
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
    searchResult (searchDesserts, searchTitle, searchGenre) {
      // 表示データ設定
      this.viewDesserts = cloneDeep(searchDesserts)
      this.searchTitle = searchTitle
      this.searchGenre = searchGenre
    },
    saveResult (searchDesserts, originalDesserts) {
      // 表示データ設定
      this.viewDesserts = cloneDeep(searchDesserts)
      this.originalDesserts = cloneDeep(originalDesserts)
      // 登録・修正画面ダイアログクローズ
      this.editDialog = false
    },
    deleteResult (searchDesserts, originalDesserts) {
      // 表示データ設定
      this.viewDesserts = cloneDeep(searchDesserts)
      this.originalDesserts = cloneDeep(originalDesserts)
      // 削除確認画面ダイアログクローズ
      this.confirmDialog = false
    },
    editOpen (item) {
      // 選択行の内容を修正画面の項目に設定
      this.editedItem = Object.assign({}, item)
      // 登録・修正画面ダイアログオープン
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
    }
  }
})
</script>
