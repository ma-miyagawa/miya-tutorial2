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
    viewDesserts: []
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
    }
  }
}
</script>
