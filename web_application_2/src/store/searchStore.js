/* ------------------------------------------------------------------- *
 * 検索条件ストア
 * ------------------------------------------------------------------- */
export default {
  namespaced: true,
  state: {
    searchTitle: '',
    searchGenre: ''
  },
  mutations: {
    // 検索条件を変更するミューテーション
    setSearchCondition (state, searchCondition) {
      state.searchTitle = searchCondition.title
      state.searchGenre = searchCondition.genre
    }
  },
  getters: {
    searchTitle (state) { return state.searchTitle },
    searchGenre (state) { return state.searchGenre }
  },
  actions: {
    doUpdate ({ commit }, searchCondition) {
      commit('setSearchCondition', searchCondition)
    }
  }
}
