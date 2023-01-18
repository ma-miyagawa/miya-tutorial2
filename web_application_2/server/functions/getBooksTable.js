/**
 * xxx
 * @param
 * @returns
 */
export default function getBooksTable (searchTitle, searchGenre) {

  let books = []

  try {
    // DB接続
    const connectionSel = dbConnect()
    // 検索
    let selSql = 'SELECT id, title, genre, purchaseDate, buyer, review FROM booksList_table '
    if (searchTitle.length > 0 && searchGenre.length > 0) {
      selSql += 'WHERE title=\'' + searchTitle + '\' AND genre LIKE \'%' + searchGenre + '%\''
    } else if (searchTitle.length > 0 && searchGenre.length === 0) {
      selSql += 'WHERE title=\'' + searchTitle + '\''
    } else if (searchTitle.length === 0 && searchGenre.length > 0) {
      selSql += 'WHERE genre LIKE \'%' + searchGenre + '%\''      
    }
    const statement = connectionSel.createStatement()
    const results = statement.executeQuery(selSql)
      const Book = function (id, title, genre, purchaseDate, buyer, review) {
      this.id = id
      this.title = title
      this.genre = genre
      this.purchaseDate = purchaseDate.substr(0,4) + '/' +
        purchaseDate.substr(4,2) + '/' +
        purchaseDate.substr(6,2) 
      this.buyer = buyer
      this.review = review
    }
    while (results.next()) {
      let book = new Book(results.getInt('id'),
      results.getString('title'),
      results.getString('genre'),
      results.getString('purchaseDate'),
      results.getString('buyer'),
      results.getString('review'))
      books.push(book)
    }
    // 後処理
    results.close()
    statement.close()
    connectionSel.close()
  } catch (e) {
    throw e
  }

  return books
}
