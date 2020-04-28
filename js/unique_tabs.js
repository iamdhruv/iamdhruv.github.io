var CONSTANTS = {
  LAST_REQUEST_DATE_TIME: 'dummy_lastRequestDateTime',
  UNIQUE_TAB_ID: 'dummy_uniqueTabId',
  COMMON_TAB_ID: 'dummy_tabsCommonId',
};
var commonId = getCommonId();
var uniqueTabId = getUniqueTabId();
alert('commonId', commonId);
alert('uniqueTabId', uniqueTabId);

function getUniqueTabId() {
  var tabId = sessionStorage.getItem(CONSTANTS.UNIQUE_TAB_ID);
  if(!tabId || isDuplicateWindow()) {
    tabId = setUniqueTabId();
  }
  if(!window.name) {
    window.name = "dummyWindowName";
  }
  return tabId;
}

function isDuplicateWindow() {
  return Boolean(!window.name && sessionStorage.getItem(CONSTANTS.UNIQUE_TAB_ID));
}

function getCommonId() {
  var lastRequestDateTime = +localStorage.getItem(CONSTANTS.LAST_REQUEST_DATE_TIME);
  var currentDateTime = Date.now();
  var lastRequestTimeDifference;
  if(lastRequestDateTime && typeof lastRequestDateTime === "number" && lastRequestDateTime === lastRequestDateTime) {
    lastRequestTimeDifference = currentDateTime - lastRequestDateTime;
    if(lastRequestTimeDifference && lastRequestTimeDifference >= 30*60*1000) {
      return setCommonId();
    } else {
      return localStorage.getItem(CONSTANTS.COMMON_TAB_ID);
    }
  } else {
    return setCommonId();
  }
}

function setCommonId() {
  var commonId = createUUID();
  localStorage.setItem(CONSTANTS.COMMON_TAB_ID, commonId);
  localStorage.setItem(CONSTANTS.LAST_REQUEST_DATE_TIME, Date.now());
  return commonId;
}

function setUniqueTabId() {
  var uniqueTabId = createUUID();
  sessionStorage.setItem(CONSTANTS.UNIQUE_TAB_ID, uniqueTabId);
  return uniqueTabId;
}

function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
