<template>
  <div>
    <v-container fluid>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <v-text-field
            label="タイトル"
            v-model="searchTitle"
            solo
          ></v-text-field>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="4"
        >
          <v-text-field
            label="ジャンル"
            v-model="searchGenre"
            solo
          ></v-text-field>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-btn
            tile
            color="light-blue"
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
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    >
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
      desserts: [],
      cloneDesserts: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.desserts = [
        { title: 'タイトル１', genre: 'ジャンル１', purchaseDate: '2022/11/11', buyer: '宮川' },
        { title: 'タイトル２', genre: 'ジャンル１', purchaseDate: '2022/11/12', buyer: '松尾' },
        { title: 'タイトル３', genre: 'ジャンル２', purchaseDate: '2022/11/13', buyer: '嶋田' },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/14', buyer: '横山' },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/15', buyer: '轟' },
        { title: 'タイトル４', genre: 'ジャンル１', purchaseDate: '2022/11/16', buyer: '野瀬' },
        { title: 'タイトル２', genre: 'ジャンル２', purchaseDate: '2022/11/17', buyer: '西埜' }
      ]
      // クローンデータ作成
      this.cloneDesserts = JSON.parse(
        JSON.stringify(this.desserts)
      )
    },
    searchItem () {
      // 初期化
      this.desserts.splice(-this.desserts.length)
      // クローンデータを取得
      let searchDesserts = JSON.parse(
        JSON.stringify(this.cloneDesserts)
      )
      // フィルター
      if (this.searchTitle.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.title === this.searchTitle)
      }
      if (this.searchGenre.length > 0) {
        searchDesserts = searchDesserts.filter((dessert) => dessert.genre.indexOf(this.searchGenre) !== -1)
      }
      // 表示データ設定
      this.desserts = JSON.parse(
        JSON.stringify(searchDesserts)
      )
    },
    editItem (item) {
    },
    deleteItem  (item) {
    }
  }
}
</script>
