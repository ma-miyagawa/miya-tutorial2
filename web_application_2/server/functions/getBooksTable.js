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

  let selSql = `SELECT B.id, B.title, G.genreName, B.purchaseDate, B.buyer, B.review FROM booksList_table AS B `
  selSql += `INNER JOIN genre_table AS G ON B.genreCode = G.genreCode `
  if (searchTitle.length > 0 && searchGenre.length > 0) {
    // タイトル、ジャンル両方入力時
    selSql += `where B.title='${searchTitle}' AND B.genreCode = '${searchGenre}'`
  } else if (searchTitle.length > 0 && searchGenre.length === 0) {
    // タイトルのみ入力時
    selSql += `where B.title='${searchTitle}'`
  } else if (searchTitle.length === 0 && searchGenre.length > 0) {
    // ジャンルのみ入力時
    selSql += `where B.genreCode = '${searchGenre}'`
  }
  return selSql
}
