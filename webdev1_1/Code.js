function doGet() {
  // HtmlTemplateオブジェクトを取得
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function updCounterTable(value) {
  // DB接続
  const connection = dbConnect();
  // 更新 or 追加
  const execSql = `
      INSERT INTO counter_table (id ,counter) values (?, ?)
      ON DUPLICATE KEY UPDATE 
      counter = ? 
    `;
  const statement = connection.prepareStatement(execSql);
  statement.setInt(1, 1);
  statement.setInt(2, value);
  statement.setInt(3, value);
  let count = statement.executeUpdate();  
  // 後処理
  statement.close();
  connection.close();
}

function getCouterTable() {
  // DB接続
  const connectionSel = dbConnect();
  // 検索
  const selSql = `
      SELECT counter FROM counter_table
    `;
  const statement = connectionSel.createStatement();
  const results = statement.executeQuery(selSql);
  let count = 0;
  while (results.next()) {
    count = results.getInt('counter');
  }
  // 後処理
  results.close();
  statement.close();
  connectionSel.close();
  return count;
}

function dbConnect() {
  // DB接続
  const connectObj = dbAccessInfo()
  return Jdbc.getCloudSqlConnection(connectObj.url, connectObj.userName, connectObj.password)
}
