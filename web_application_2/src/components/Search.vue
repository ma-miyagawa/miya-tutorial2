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
          <v-select
            v-model="searchGenre"
            :items="genreItems"
            item-text="genreName"
            item-value="genreCode"
            return-object
          ></v-select>
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
  computed: {
    genreItems () {
      return this.$store.getters['genreStore/genreItems']
    }
  },
  methods: {
    searchItem () {
      // 表示データ設定
      this.$emit('searchResult', this.searchTitle, this.searchGenre.genreCode)
    }
  }
}
</script>
