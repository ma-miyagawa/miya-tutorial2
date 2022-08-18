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

function isExistCounterTable(connection) {
  const statement = connection.createStatement();
  let resultExist = false;
  let results = statement.executeQuery('SELECT counter FROM counter_table'); 
  // 更新 or 追加
  if (results.next()) {
    // 既に登録済の場合、更新
    resultExist = true;
  } else {
    // 未登録の場合、追加
    resultExist = false;
  }
  // 後処理
  results.close();
  statement.close();
  return resultExist;
}

function updCounterTable(value) {
  // DB接続
  const connection = dbConnect();
  // 更新 or 追加
  let execSql = '';
  if (isExistCounterTable(connection)) {
    // 既に登録済の場合、更新
    execSql = 'UPDATE counter_table SET counter = ?';
  } else {
    // 未登録の場合、追加
    execSql = 'INSERT INTO counter_table (counter) values (?)';
  }
  const statement = connection.prepareStatement(execSql);
  statement.setString(1, value);
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

