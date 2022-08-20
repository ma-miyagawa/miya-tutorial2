function doGet() {
  // HtmlTemplateオブジェクトを取得
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function getInitSheetData() {
  // スプレッドシートを特定して取得
  const spreadsheet = SpreadsheetApp.openById('1CumINxWvk5xzU7aDvir_vpr887Do5lkDchNcp7-uyhA');
  // シートを特定して取得
  const sheet = spreadsheet.getSheetByName('シート1');
  // シートから値を取得
  let value = sheet.getRange('A1').getValue();
  // シートから取得した値を画面に渡します
  if (!isFinite(value)) {
    value = 0
  }
  return value;
}

function setSheetData(value) {
  // スプレッドシートを特定して取得
  const spreadsheet = SpreadsheetApp.openById('1CumINxWvk5xzU7aDvir_vpr887Do5lkDchNcp7-uyhA');
  // シートを特定して取得
  const sheet = spreadsheet.getSheetByName('シート1');
  // セル（範囲）を特定して取得
  const range = sheet.getRange('A1');
  // 対象のセルの入力値を設定
  range.setValue(value);
}

function updCounterTable(value) {
  // DB接続
  const connection = dbConnect();
  // 更新 or 追加
  let execSql = 'INSERT INTO counter_table (id ,counter) values (?, ?) ';
  execSql += 'ON DUPLICATE KEY UPDATE ';
  execSql += 'counter = ? ';

  const statement = connection.prepareStatement(execSql);
  statement.setInt(1, 1);
  statement.setInt(2, value);
  statement.setInt(3, value);
  let count = statement.executeUpdate();  
  // 後処理
  statement.close();
  connection.close();
}

function dbConnect() {
  // DB接続用定数設定
  const connectionName = 'esm-gcp-study:us-central1:modern-study'; //Instance_connection_name
  const userName = 'esm'; //user_name
  const password = 'esm'; //user_password
  const databaseName = 'web_book_ma-miyagawa'; //database_name
  const url = 'jdbc:google:mysql://' + connectionName + '/' + databaseName;
  // DB接続
  return Jdbc.getCloudSqlConnection(url, userName, password);
}

