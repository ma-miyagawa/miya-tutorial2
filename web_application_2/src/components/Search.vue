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
            v-on:click="searchItem"
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
export default {
  data () {
    return {
      searchTitle: '',
      searchGenre: ''
    }
  },
  methods: {
    searchItem () {
      // 表示データ設定
      this.$emit('searchResult', this.searchTitle, this.searchGenre)
    }
  }
}
</script>
