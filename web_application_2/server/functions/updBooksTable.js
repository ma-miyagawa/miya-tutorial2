/**
 * xxx
 * @param
 * @returns
 */
export default function updateBooksTable (editedItem, isAddMode) {

  // DB操作用オブジェクト生成
  const connectObj = new dbOperation()

  // DB接続
  connectObj.connectDb()

  // 更新用SQL作成
  const sqlForUpdate = makeSQLStatement(isAddMode)
    
  // プリペアドステートメントの実行
  connectObj.execPrepareStatement(sqlForUpdate)

  // パラメータの設定
  connectObj.setParamString(1, editedItem.title)
  connectObj.setParamString(2, editedItem.genre)
  const [year, month, day] = editedItem.purchaseDate.split('/')
  connectObj.setParamString(3, `${year}${month}${day}`)
  connectObj.setParamString(4, editedItem.buyer)
  connectObj.setParamString(5, editedItem.review)
  if (!isAddMode) connectObj.setParamInt(6, editedItem.id)

  // 更新の実行
  connectObj.execDbUpdate()

  // 後処理
  connectObj.closeObj()
}

function makeSQLStatement(isAddMode) {

  if (isAddMode) {
    // 新規登録の場合
    return `
      INSERT INTO booksList_table (title, genreCode, purchaseDate, buyer, review, insertDate)
       values (?, ?, ?, ?, ?, cast( now() as date))`

  } else {
    // 修正の場合
    return `
      UPDATE booksList_table SET
       title = ?, genreCode = ?, purchaseDate = ?, buyer = ?, review = ?, updateDate = cast( now() as date)
       WHERE id = ?
    `
  }
}
