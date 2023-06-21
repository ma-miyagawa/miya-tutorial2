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
    <v-overlay v-model="overlay" z-index="999">
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

const cloneDeep = require('lodash/cloneDeep')
const google = window.google
export default Vue.extend({
  components: {
    Search,
    List
  },
  data () {
    return {
      originalDesserts: [],
      viewDesserts: [],
      confirmDialog: false,
      overlay: false,
      deleteItemId: -1,
      searchTitle: '',
      searchGenre: ''
    }
  },
  async created () {
    // 初期検索処理
    this.overlay = true
    try {
      await this.$store.dispatch('genreStore/doUpdate')
      const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre, this.$store.getters['genreStore/genreItems'])
      this.viewDesserts = cloneDeep(result)
    } catch (error) {
      alert('失敗しました' + error.message)
    }
    this.overlay = false
  },
  methods: {
    async searchResult (searchTitle, searchGenre) {
      this.searchTitle = searchTitle
      this.searchGenre = searchGenre
      // 検索処理
      this.overlay = true
      try {
        const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre)
        this.viewDesserts = cloneDeep(result)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
    },
    async deleteResult () {
      // 削除処理
      this.overlay = true
      try {
        await this.gasRun('deleteBooksTable', this.deleteItemId)
        const result = await this.gasRun('getBooksTable', this.searchTitle, this.searchGenre)
        this.viewDesserts = cloneDeep(result)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
      // 削除確認画面ダイアログクローズ
      this.confirmDialog = false
    },
    addOpen () {
      // 登録画面ダイアログオープン
      this.$router.push({ name: 'Form', params: { id: -1 } })
    },
    editOpen (item) {
      // 修正画面ダイアログオープン
      this.$router.push({ name: 'Form', params: { id: item.id } })
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
