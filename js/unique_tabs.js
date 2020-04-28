var CONSTANTS = {
  LAST_REQUEST_DATE_TIME: 'dummy_lastRequestDateTime',
  UNIQUE_TAB_ID: 'dummy_uniqueTabId',
  COMMON_TAB_ID: 'dummy_tabsCommonId',
};
var commonId = getCommonId2();
var uniqueTabId = getUniqueTabId();
alert('commonId = ' + commonId + '\n' + 'uniqueTabId = ' + uniqueTabId);

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

function getCommonId2() {
   var localStorageCookie = getCookie('localStorageCookie');
   var commonId = createUUID();
   if(!localStorageCookie) {
      setCookie('localStorageCookie', commonId, 5*60*1000);
   }
   return commonId;
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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, extime) {
  var d = new Date();
  d.setTime(d.getTime() + (extime));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
