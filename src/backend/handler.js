// Constants
const IBGE_SPREADSHEET_ID = "1dcri2Nj4FIdmL-bX94eNYygMdzHuriLRpDfL4wcRDHU";

// Retrieve IBGE data
let ibgeData;

function getIBGECitiesData() {
  if (!ibgeData) {
    const spreadsheet = SpreadsheetApp.openById(IBGE_SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    const ibgeRawData = sheet.getRange("A1:CY1").getValues();
    ibgeData = JSON.parse(ibgeRawData[0].join(''));
  }
  return ibgeData;
}

function getIBGERandomCityObject() {
  const data = getIBGECitiesData();
  const filteredData = data.filter((obj) => obj["UF-sigla"] == "SC")
  const randomIndex = Math.floor(Math.random() * filteredData.length);

  return filteredData[randomIndex];
}

// Main
function doGet() {
  const template = HtmlService.createTemplateFromFile('app/mainpage');

  return template.evaluate()
    .setTitle('AdivinheCidade')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
