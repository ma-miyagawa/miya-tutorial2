/* ------------------------------------------------------------------- *
 * ジャンルストア
 * ------------------------------------------------------------------- */
export default {
  namespaced: true,
  state: {
    genres: []
  },
  mutations: {
    // ジャンル一覧を変更するミューテーション
    setGenres (state, payload) {
      state.genres = payload.genres
    }
  },
  getters: {
    genres (store) { return store.genres }
  },
  actions: {
    // ジャンル一覧の更新処理
    doUpdate ({ commit }, genres) {
      commit('setGenres', { genres })
    }
  }
}
