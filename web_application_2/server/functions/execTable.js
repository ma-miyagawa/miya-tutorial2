/**
 * xxx
 * @param
 * @returns
 */
// const Jdbc = require('@types/google-apps-script/google-apps-script.jdbc')

export default function getBooksTable () {
  // DB接続
  const connectionSel = dbConnect()
  // 検索
  const selSql = `
      SELECT id, title, genre, purchaseDate, buyer, review FROM booksList_table
    `
  const statement = connectionSel.createStatement()
  const results = statement.executeQuery(selSql)
  let books = []
  while (results.next()) {
    let book = function (results) {
      this.id = results.getInt('id')
      this.title = results.getString('title')
      this.title = results.getString('genre')
      this.title = results.getString('purchaseDate')
      this.title = results.getString('buyer')
      this.title = results.getString('review')
    }
    books.push(book)
  }
  // 後処理
  results.close()
  statement.close()
  connectionSel.close()
  return books
}
function dbConnect () {
  // DB接続用定数設定
  const connectionName = 'esm-gcp-study:us-central1:modern-study' // Instance_connection_name
  const userName = 'esm' // user_name
  const password = 'esm' // user_password
  const databaseName = 'web_book_ma-miyagawa' // database_name
  const url = 'jdbc:google:mysql://' + connectionName + '/' + databaseName
  // DB接続
  return Jdbc.getCloudSqlConnection(url, userName, password)
}
