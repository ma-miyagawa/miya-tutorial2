/**
 * sample
 * @param {*} yyy sample
 */
export const xxx = (yyy) => {
  console.log('xxx')
}
/**
 * 検索機能
 */

export function searchExec (originalDesserts, searchTitle, searchGenre) {
  const cloneDeep = require('lodash/cloneDeep')
  let searchDesserts = cloneDeep(originalDesserts)
  // フィルター
  if (searchTitle.length > 0) {
    searchDesserts = searchDesserts.filter((dessert) => dessert.title === searchTitle)
  }
  if (searchGenre.length > 0) {
    searchDesserts = searchDesserts.filter((dessert) => dessert.genre.indexOf(searchGenre) !== -1)
  }
  return searchDesserts
}
