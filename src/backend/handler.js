// Constants
const IBGE_SPREADSHEET_ID = "1dcri2Nj4FIdmL-bX94eNYygMdzHuriLRpDfL4wcRDHU";

function getIBGECitiesData() {
  const spreadsheet = SpreadsheetApp.openById(IBGE_SPREADSHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  const ibgeRawData = sheet.getRange("A1:CY1").getValues();
  const ibgeData = JSON.parse(ibgeRawData[0].join(''));

  return ibgeData;
}

function getIBGERandomCityObject(stateObj) {
  const randomIndex = Math.floor(Math.random() * stateObj.length);

  return stateObj[randomIndex];
}

// Main
function doGet() {
  const template = HtmlService.createTemplateFromFile('app/mainpage');

  return template.evaluate()
    .setTitle('AdivinheCidade')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
