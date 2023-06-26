/**
 * xxx
 * @param
 * @returns
 */
export default function getGenreTable () {

  let genres = []
  // DB操作用オブジェクト生成
  const connectObj = new dbOperation()

  // DB接続
  connectObj.connectDb()

  // 検索用SQL作成
  const sqlForSelect = makeSQLStatement()
    
  // 結果取得
  connectObj.makeResultSet(sqlForSelect)
  const results = connectObj.getResults()
  while (results.next()) {
    const genre = {
      genreCode: results.getString('genreCode'),
      genreName: results.getString('genreName')
    }  
    genres.push(genre)
  }
  // 後処理
  connectObj.closeObj()

  return genres
}

function makeSQLStatement() {

  return `SELECT genreCode, genreName FROM genre_table `

}
