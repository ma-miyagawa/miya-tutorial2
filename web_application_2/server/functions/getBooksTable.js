/**
 * xxx
 * @param
 * @returns
 */
export default function getBooksTable (searchTitle, searchGenre) {

  let books = []
  const bookProperty = function (id, title, genre, purchaseDate, buyer, review) {
    this.id = id
    this.title = title
    this.genre = genre
    this.purchaseDate = purchaseDate.substr(0,4) + '/' +
      purchaseDate.substr(4,2) + '/' +
      purchaseDate.substr(6,2) 
    this.buyer = buyer
    this.review = review
  }

  try {
    // DB操作用オブジェクト生成
    const connectObj = new dbOperation()

    // DB接続
    connectObj.dbConnect()

    // 検索用SQL作成
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
    
    // 結果取得
    connectObj.dbResult(selSql)
    const results = connectObj.getResults()
    while (results.next()) {
      let book = new bookProperty(
        results.getInt('id'),
        results.getString('title'),
        results.getString('genre'),
        results.getString('purchaseDate'),
        results.getString('buyer'),
        results.getString('review'))
      books.push(book)
    }
    // 後処理
    connectObj.closeObj()
  } catch (e) {
    throw e
  }

  return books
}
