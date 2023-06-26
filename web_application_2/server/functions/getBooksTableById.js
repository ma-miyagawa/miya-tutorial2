/**
 * xxx
 * @param
 * @returns
 */
export default function getBooksTableById (id) {

  // DB操作用オブジェクト生成
  const connectObj = new dbOperation()

  // DB接続
  connectObj.connectDb()

  // 検索用SQL作成
  const sqlForSelect = makeSQLStatement(id)
    
  // 結果取得
  connectObj.makeResultSet(sqlForSelect)
  const results = connectObj.getResults()
  results.next()
  const book = {
    id: results.getInt('id'),
    title: results.getString('title'),
    genre: results.getString('genreCode'),
    purchaseDate: results.getString('purchaseDate').substr(0,4) + '/' + 
      results.getString('purchaseDate').substr(4,2) + '/' +
      results.getString('purchaseDate').substr(6,2) ,
    buyer: results.getString('buyer'),
    review: results.getString('review')
  }
  // 後処理
  connectObj.closeObj()

  return book
}

function makeSQLStatement(id) {

  return `SELECT id, title, genreCode, purchaseDate, buyer, review FROM booksList_table WHERE id='${id}'`

}
