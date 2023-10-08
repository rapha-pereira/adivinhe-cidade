// Constants
const IBGE_SPREADSHEET_ID = "1dcri2Nj4FIdmL-bX94eNYygMdzHuriLRpDfL4wcRDHU";
const IBGE_API_BASE_URL = "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/";

// MIsc.
function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

// Normalize accents
function removeAccents(str) {
  const accentMap = {
    'á': 'a', 'â': 'a', 'ã': 'a', 'à': 'a',
    'é': 'e', 'ê': 'e', 'í': 'i', 'ó': 'o',
    'ô': 'o', 'õ': 'o', 'ú': 'u', 'ü': 'u',
    'ç': 'c'
  };

  return str.replace(/[áâãàéêíóôõúüç]/g, matched => accentMap[matched] || matched);
}

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

// Build & Get functions
function buildCityURL(data) {
  return `${IBGE_API_BASE_URL}${data['municipio-id']}`;
}

function getCityName(data) {
  const cityName = data['municipio-nome'];
  console.log(cityName)
  return removeAccents(cityName).toLowerCase();
}

function getCityStateName(data) {
  return data['UF-nome'];
}

function getCityRegionName(data) {
  return data['mesorregiao-nome'];
}

function doGet() {
  const ibgeCityObj = getIBGERandomCityObject();

  const template = HtmlService.createTemplateFromFile('index');
  template.imageUrl = buildCityURL(ibgeCityObj);
  template.cityName = getCityName(ibgeCityObj);
  template.cityStateName = getCityStateName(ibgeCityObj);
  template.cityRegionName = getCityRegionName(ibgeCityObj);

  return template.evaluate()
    .setTitle('AdivinheCidade')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
