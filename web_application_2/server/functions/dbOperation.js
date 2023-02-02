/**
 * DB操作用オブジェクト
 * @param
 * @returns
 */
export default class dbOperation  {
  constructor() {
    const dbConnection = null
    const dbStatement = null
    const dbResultSet = null
  }

  connectDb() {
    // DB接続用定数設定
    const connectionName = 'esm-gcp-study:us-central1:modern-study' // Instance_connection_name
    const userName = 'esm' // user_name
    const password = 'esm' // user_password
    const databaseName = 'web_book_ma-miyagawa' // database_name
    const url = 'jdbc:google:mysql://' + connectionName + '/' + databaseName
    // DB接続
    this.dbConnection = Jdbc.getCloudSqlConnection(url, userName, password)
  }

  makeResultSet(sqlStatement) {
    // 結果セットの作成
    this.dbStatement = this.dbConnection.createStatement()
    this.dbResultSet = this.dbStatement.executeQuery(sqlStatement)
  }

  execPrepareStatement(sqlStatement) {
    // プリペアドステートメントの実行
    this.dbStatement = this.dbConnection.prepareStatement(sqlStatement)
  }

  setParamInt(num, value) {
    // パラメータの設定
    this.dbStatement.setInt(num, value)
  }

  setParamString(num, value) {
    // パラメータの設定
    this.dbStatement.setString(num, value)
  }

  execDbUpdate() {
    // 更新の実行
    this.dbStatement.executeUpdate()
  }

  closeObj() {
    // DBオブジェクトのclose
    if (this.dbResultSet != null) this.dbResultSet.close()
    if (this.dbStatement != null) this.dbStatement.close()
    if (this.dbConnection != null) this.dbConnection.close()
  }

  getResults() {
    // 検索結果レコードの取得
    return this.dbResultSet
  }
}
