/**
 * xxx
 * @param
 * @returns
 */
export default function dbConnect () {
  // DB接続用定数設定
  const connectionName = 'esm-gcp-study:us-central1:modern-study' // Instance_connection_name
  const userName = 'esm' // user_name
  const password = 'esm' // user_password
  const databaseName = 'web_book_ma-miyagawa' // database_name
  const url = 'jdbc:google:mysql://' + connectionName + '/' + databaseName
  // DB接続
  return Jdbc.getCloudSqlConnection(url, userName, password)
}
