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
            class="white--text"
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
  </div>
</template>

<script>
import { searchExec } from '../modules/util'
export default {
  data () {
    return {
      searchTitle: '',
      searchGenre: ''
    }
  },
  props: {
    originalDesserts: []
  },
  methods: {
    searchItem () {
      // DBから取得した全データを取得
      const searchDesserts = searchExec(this.originalDesserts, this.searchTitle, this.searchGenre)
      // 表示データ設定
      this.$emit('searchResult', searchDesserts, this.searchTitle, this.searchGenre)
    }
  }
}
</script>
