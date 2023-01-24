/**
 * xxx
 * @param
 * @returns
 */
export default function getBooksTable (searchTitle, searchGenre) {

  let books = []
  try {
    // DB操作用オブジェクト生成
    const connectObj = new dbOperation()

    // DB接続
    connectObj.dbConnect()

    // 検索用SQL作成
    let selSql = getSQLStatement(searchTitle, searchGenre)
    
    // 結果取得
    connectObj.dbResult(selSql)
    const results = connectObj.getResults()
    while (results.next()) {
      const book = {
        id: results.getInt('id'),
        title: results.getString('title'),
        genre: results.getString('genre'),
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
  } catch (e) {
    throw e
  }

  return books
}

function getSQLStatement(searchTitle, searchGenre) {

  let selSql = `SELECT id, title, genre, purchaseDate, buyer, review FROM booksList_table `
  if (searchTitle.length > 0 && searchGenre.length > 0) {
    // タイトル、ジャンル両方入力時
    selSql += `WHERE title='${searchTitle}' AND genre LIKE '%${searchGenre}%'`
  } else if (searchTitle.length > 0 && searchGenre.length === 0) {
    // タイトルのみ入力時
    selSql += `WHERE title='${searchTitle}'`
  } else if (searchTitle.length === 0 && searchGenre.length > 0) {
    // ジャンルのみ入力時
    selSql += `WHERE genre LIKE '%${searchGenre}%'`
  }
  return selSql
}
