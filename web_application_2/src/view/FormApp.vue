<template>
  <div>
    <Form :editedItem="editedItem"
          @saveResult="saveResult"
          @editCancel="editCancel"
          @changeTitle="changeTitle"
          @changeGenre="changeGenre"
          @changePurchaseDate="changePurchaseDate"
          @changeBuyer="changeBuyer"
          @changeReview="changeReview"
          >
    </Form>
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
import Form from '../components/Form.vue'

const google = window.google
export default Vue.extend({
  components: {
    Form
  },
  data () {
    return {
      overlay: false,
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
      }
    }
  },
  async created () {
    // 画面表示
    if (this.$route.params.id === -1) {
      this.addOpen()
    } else {
      this.overlay = true
      try {
        const item = await this.gasRun('getBooksTableById', this.$route.params.id)
        this.editOpen(item)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
    }
  },
  methods: {
    async saveResult (isAddMode) {
      // 登録処理
      this.overlay = true
      try {
        await this.gasRun('updateBooksTable', this.editedItem, isAddMode)
      } catch (error) {
        alert('失敗しました' + error.message)
      }
      this.overlay = false
      this.$router.push({ name: 'Home' })
    },
    addOpen () {
      // 登録画面オープン
      // 選択行の内容を登録画面の項目に設定
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    editOpen (item) {
      // 修正画面オープン
      // 選択行の内容を修正画面の項目に設定
      this.editedItem = Object.assign({}, item)
    },
    editCancel () {
      // 登録・修正画面クローズ
      this.$router.push({ name: 'Home' })
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
