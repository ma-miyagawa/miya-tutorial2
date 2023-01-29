/**
 * xxx
 * @param
 * @returns
 */
export default function updBooksTable (editedItem, isAddMode) {

  try {
    // DB操作用オブジェクト生成
    const connectObj = new dbOperation()

    // DB接続
    connectObj.dbConnect()

    // 更新用SQL作成
    let selSql = getSQLStatement(isAddMode)
    
    // プリペアドステートメントの実行
    connectObj.dbPrepareStatement(selSql)

    // パラメータの設定
    connectObj.dbSetParamString(1, editedItem.title)
    connectObj.dbSetParamString(2, editedItem.genre)
    const [year, month, day] = editedItem.purchaseDate.split('/')
    connectObj.dbSetParamString(3, `${year}${month}${day}`)
    connectObj.dbSetParamString(4, editedItem.buyer)
    connectObj.dbSetParamString(5, editedItem.review)
    if (!isAddMode) connectObj.dbSetParamInt(6, editedItem.id)

    // 更新の実行
    connectObj.dbExecuteUpdate()

    // 後処理
    connectObj.closeObj()
  } catch (e) {
    throw e
  }
}

function getSQLStatement(isAddMode) {

  if (isAddMode) {
    // 新規登録の場合
    return `
      INSERT INTO booksList_table (title, genre, purchaseDate, buyer, review, insertDate)
       values (?, ?, ?, ?, ?, cast( now() as date))`

  } else {
    // 修正の場合
    return `
      UPDATE booksList_table SET
       title = ?, genre = ?, purchaseDate = ?, buyer = ?, review = ?, updateDate = cast( now() as date)
       WHERE id = ?
    `
  }
}
