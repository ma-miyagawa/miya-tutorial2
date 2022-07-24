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
