<template>
  <div>
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
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on:click="addItem()"
              >
                <v-icon left>
                  mdi-arrow-up-bold-box-outline
                </v-icon>
                  追加
              </v-btn>
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
      headers: [
        { text: 'タイトル', align: 'start', sortable: false, value: 'title', width: '30%' },
        { text: 'ジャンル', align: 'start', sortable: false, value: 'genre', width: '20%' },
        { text: '購入日', align: 'start', sortable: false, value: 'purchaseDate', width: '15%' },
        { text: '購入者', align: 'start', sortable: false, value: 'buyer', width: '15%' },
        { text: '更新', sortable: false, value: 'update', width: '5%' },
        { text: '削除', sortable: false, value: 'delete', width: '5%' }
      ]
    }
  },
  props: {
    viewDesserts: [],
    confirmDialog: Boolean
  },
  methods: {
    editItem (item) {
      // 表示データ設定
      this.$emit('editOpen', item)
    },
    addItem () {
      // 表示データ設定
      this.$emit('addOpen')
    },
    deleteItem (item) {
      // 表示データ設定
      this.$emit('confirmOpen', item)
    },
    closeDelete () {
      // 削除確認画面ダイアログクローズ
      this.$emit('confirmCancel')
    },
    deleteItemConfirm () {
      // 削除処理
      this.$emit('deleteResult')
    }
  }
}
</script>
