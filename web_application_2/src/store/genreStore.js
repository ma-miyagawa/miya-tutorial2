/* ------------------------------------------------------------------- *
 * ジャンルストア
 * ------------------------------------------------------------------- */
const google = window.google
export default {
  namespaced: true,
  state: {
    genres: []
  },
  mutations: {
    // ジャンル一覧を変更するミューテーション
    setGenres (state, genres) {
      state.genres = genres
    }
  },
  getters: {
    genreItems (state) { return state.genres },
    getGenre (state) {
      return function (code) {
        return {
          genreCode: code,
          genreName: code === '' ? '' : state.genres.find(genre => genre.genreCode === code).genreName
        }
      }
    }
  },
  actions: {
    async doUpdate ({ commit }) {
      try {
        await new Promise(function (resolve) {
          google.script.run.withSuccessHandler(function (retValue) {
            resolve(retValue)
          }).getGenreTable()
        }).then(retValue => {
          commit('setGenres', retValue)
        })
      } catch (error) {
        throw error
      }
    }
  }
}
