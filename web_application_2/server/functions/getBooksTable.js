/**
 * xxx
 * @param
 * @returns
 */
export default function getBooksTable (searchTitle, searchGenre) {

  let books = []
  // DB操作用オブジェクト生成
  const connectObj = new dbOperation()

  // DB接続
  connectObj.connectDb()

  // 検索用SQL作成
  const sqlForSelect = makeSQLStatement(searchTitle, searchGenre)
    
  // 結果取得
  connectObj.makeResultSet(sqlForSelect)
  const results = connectObj.getResults()
  while (results.next()) {
    const book = {
      id: results.getInt('id'),
      title: results.getString('title'),
      genre: results.getString('genreName'),
      purchaseDate: results.getString('purchaseDate').substr(0,4) + '/' + 
        results.getString('purchaseDate').substr(4,2) + '/' +
        results.getString('purchaseDate').substr(6,2) ,
      buyer: results.getString('buyer'),
      review: results.getString('review')
    }  
    books.push(book)
  }
  // 後処理
  connectObj.closeObj()

  return books
}

function makeSQLStatement(searchTitle, searchGenre) {

  let selSql = `SELECT id, title, genreName, purchaseDate, buyer, review FROM booksList_table A, genre_table B WHERE A.genreCode = B.genreCode `
  if (searchTitle.length > 0 && searchGenre.length > 0) {
    // タイトル、ジャンル両方入力時
    selSql += `AND title='${searchTitle}' AND A.genreCode = '${searchGenre}'`
  } else if (searchTitle.length > 0 && searchGenre.length === 0) {
    // タイトルのみ入力時
    selSql += `AND title='${searchTitle}'`
  } else if (searchTitle.length === 0 && searchGenre.length > 0) {
    // ジャンルのみ入力時
    selSql += `AND A.genreCode = '${searchGenre}'`
  }
  return selSql
}
