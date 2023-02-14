/**
 * xxx
 * @param
 * @returns
 */
export default function deleteBooksTable (deleteId) {

  // DB操作用オブジェクト生成
  const connectObj = new dbOperation()

  // DB接続
  connectObj.connectDb()

  // 更新用SQL作成
  const sqlForDelete = makeSQLStatement()
    
  // プリペアドステートメントの実行
  connectObj.execPrepareStatement(sqlForDelete)

  // パラメータの設定
  connectObj.setParamString(1, deleteId)

  // 更新の実行
  connectObj.execDbUpdate()

  // 後処理
  connectObj.closeObj()
}

function makeSQLStatement() {

  return `DELETE FROM booksList_table WHERE id = ?`
}
