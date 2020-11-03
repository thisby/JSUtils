var auths = [];
var values = [];

var CLOUD_COMPUTE_API_VERSION = 'v1';
var CLOUD_COMPUTE_ENGINE_API_KEY = "QUl6YVN5RGVuNDR4OWZKLWxEd0xEWHV4VUxDeFJHQW1tckl1OUdv";
var CLOUD_COMPUTE_ENGINE_CLIENT_ID = '930935452270-r735mpq32d3fkli1lu7s0cn9m31dt1r1.apps.googleusercontent.com';
var CLOUD_COMPUTE_ENGINE_SCOPES = 'https://www.googleapis.com/auth/compute';
//https://www.googleapis.com/auth/cloud-platform'];

var GOOGLE_SHEET_ID = "1BvbccqgHuG6-XJ9KIJIoD_sE9gAKA9iZ3XXonvd1VCg";
var GOOGLE_SHEETS_API_KEY = "AIzaSyB6cpl9KtwStLc8bFZGyEHryBg5XY6PX50";
var GOOGLE_SHEETS_CLIENT_ID = '659142072690-co0fa66mn7mfsrba0msser9djfu9bfjb.apps.googleusercontent.com';
var GOOGLE_SHEETS_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

var MAIL_SECURITY_TOKEN = "f2b89f26-1758-4d6d-873a-1000e5d350ee";


function getCookieValue(value){
var cookieSplitted = $(document.cookie.replace(' ','').split(";"));
var valuesSplitted = [];
$(cookieSplitted).each((i,e) => valuesSplitted.push(e.split("=")));
var token = "not found" ; 
for(var i in valuesSplitted){
	if (valuesSplitted[i][0] == value) {
		token = valuesSplitted[i][1];break;
		}
		continue;
	
}
return token
}


async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode comme (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // fait le condensé
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convertit le buffer en tableau d'octet
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convertit le tableau en chaîne hexadélimale
  return hashHex;
}


var createCanvas = (img) => {
	// Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height and origin to anonymous
    $(img).attr("crossOrigin","Anonymous");
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas;
}


var getDataUrl = (img) => {
	return createCanvas(img).toDataURL('image/png');
}

var fnNumberAsString = (e)=>
{
    var len = ((e + "").length) - 2;
    console.log(len);
    divide = Math.pow(10,len);
    console.log(divide);
    return e.map((e,i,arr)=>i == 0 ? arr[i] : arr[i - 1] + (arr[i] / divide))
}



function isSelectorReady(selector)
{
	return $(selector).length != 0;
}

function isSelectorFilled(selector)
{
	if(!isSelectorReady(selector))
		return false;
	return $(selector).text() != "" || $(selector).val() != "";		
}


function isSelectorVisible(selector)
{
	if (!isSelectorReady(selector))
		return false;
	return $(selector).is(":visible");
}

function sendEmail(securityToken,to,from,subject,body) 
{
	Email.send({
	SecureToken : securityToken,
	To : to,
	From : from,
	Subject : subject,
	Body : body,
	}).then(
		message => console.log(message)
	);
}



function isJqueryLoaded() {
	console.log("Utils:","isJqueryLoaded","called");
    return jQuery !== null;
}

function InjectJs(src,isAsync,isDefer,onLoadCallBack,onReadyStateChangeCallBack)
{
	if (window.debugger)
		debugger;
	var script = $("<script " +  isAsync ? 'async ' : '' + isDefer ? 'defer ' : '' + '/>');
	script.attr("src",src);
	script.attr("onload",onLoadCallBack);
	script.attr("onreadystatechange",onReadyStateChangeCallBack);
/*
	var script = '<script ';
	script += isAsync ? 'async ' : '';
	script += isDefer ? 'defer ' : '';
*/	
	$("body").append(script);
}


function randomInteger(max)
{
	var wait = Math.floor(Math.random() * max);
	console.log(wait);
	return wait;
}


function FindFirstLower(arr,item)
{
	if(/,|\./.test(item)) item = item.replace(/,|\./,'');
	var lowerValue = 0;
	if(parseInt(item) > parseInt(arr[arr.length-1])) return arr[arr.length-1];
	for(var i in arr)
	{
		if (arr[i] <= item){
			lowerValue = arr[i];
			//break;
		}
		else
			break;
	}
	return lowerValue;
}


function sheetAsJson(url,columnName,callback){
	
$.get(url)
	.done((data) => {
		var entries = data.feed.entry;
		var passColumn = entries.find((e) => e.content.$t == columnName);
		var passColumnId = parseInt(passColumn.gs$cell.col);
		var rowWanted = 1;
		var colWanted = entries.find((e,i) => i > 0 && e.gs$cell.row == rowWanted 
			&& e.gs$cell.inputValue == columnName).gs$cell.col;
		rowWanted++;
		for(var i = 0;i< entries.length-1;i++)
		{
			var entry = entries.find((e,i) => e.gs$cell.row == rowWanted 
			&& e.gs$cell.col == colWanted);
			if(typeof(entry) != "undefined")
				values.push(entry.content.$t);
			rowWanted++;				
		}
	})
	return values;
}

function CountDown(selector, duration) {
    var start = Date.now(), diff, hours, minutes, seconds;
    var timer_run = setInterval(function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        hours = (diff / (60 * 60)) | 0;
        minutes = ((diff - (hours * 60 * 60)) / 60) | 0;
        seconds = (diff - (minutes * 60) - (hours * 60 * 60)) | 0;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $(selector).html(hours + 'h:' + minutes + 'm:' + seconds + 's');
        if (timer_run !== null) {
        if (diff <= 0) {
        	$(selector).parent().addClass("blinking");
            clearInterval(timer_run);
            return;
        }
        else
        	$(selector).parent().hide();
        }
    }, 1000);
}

function InjectCss(link)
{
	$("head").append('<link rel="stylesheet" href="' + link + '">');
}

function InjectJs(src,isAsync,isDefer,onLoadCallBack,onReadyStateChangeCallBack)
{
	var script = $('<script>', {
    type: 'text/javascript',
    src: src
	});
	
	if (isAsync)
		script[0].setAttribute("async", "");		

	if (isDefer)
		script[0].setAttribute("async", "");		
		
	script[0].setAttribute("onload",onLoadCallBack);
	script[0].setAttribute("onreadystatechange",onReadyStateChangeCallBack);
	$('body').before(script);
}

function HideSelector(selector)
{
	if ($(selector).length > 0)
	do{
		($(selector).is(":visible"))
	}while($(selector).is("hidden"));
}


function ClearCookie(){
var cookie = document.cookie.split(';');

for (var i = 0; i < cookie.length; i++) {

    var chip = cookie[i],
        entry = chip.split("="),
        name = entry[0];

    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
}


/* GOOGLE API */

	/* Google Cloud Platform */ 



function googleComputeAuthorize(apiKey,clientId,scopes) {
       gapi.client.setApiKey(apiKey);
       gapi.auth.authorize({
         client_id: clientId,
         scope: scopes,
         immediate: false
       }, function(authResult) {
            if (authResult && !authResult.error) {
              handleClientLoad();
            } else {
              window.alert('Auth was not successful');
            }
          }
       );
     }
 
 
 
 
function googleComputeListInstances(project,zone,callback) {
  var request = gapi.client.compute.instances.list({
    'project': project,
    'zone': zone
  });
  request.execute(function(resp) {
    callback(resp);
  });
}

	/* Google Sheets Api */ 
function WriteToCsv(spreadsheetId,range,valueInputOption,responseDateTimeRenderOption,values)
{
	var values = [
	  [
	    values
	  ],
	  // Additional rows ...
	];
	var body = {
	  values: values
	};
	
	var params = {
	   spreadsheetId: spreadsheetId,
	   range: range,
	   valueInputOption: valueInputOption,
	   responseDateTimeRenderOption: responseDateTimeRenderOption,
	   resource: body
	};
	
	var writeToCsvTimer = setInterval(() => {
	if (typeof(gapi.client.sheets) != 'undefined') {
		clearInterval(writeToCsvTimer);
		gapi.client.sheets.spreadsheets.values.update(params).then((response) => {
		  var result = response.result;
		  console.log(`${result.updatedCells} cells updated.`);
		});
	}},100);
}

function ReadCsv(spreadsheetId,range,valueRenderOption,dateTimeRenderOption)
{
	var params = {
		spreadsheetId: spreadsheetId,
		range: range,
		valueRenderOption: valueInputOption,
		dateTimeRenderOption: dateTimeRenderOption
	};

	var readCsvTimer = setInterval(() => {
	if (typeof(gapi.client.sheets) != 'undefined') {
		gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    	}, function(reason) {
        	console.error('error: ' + reason.result.error.message);
    	});
	}},100);
}

function initClient(apiKey,clientId,scope,callback) {
      var API_KEY = typeof(apiKey) != "undefined" ? apiKey : GOOGLE_SHEETS_API_KEY;  // TODO: Update placeholder with desired API key.

      var CLIENT_ID = typeof(clientId) != "undefined" ? clientId : '659142072690-co0fa66mn7mfsrba0msser9djfu9bfjb.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

      // TODO: Authorize using one of the following scopes:
      //   'https://www.googleapis.com/auth/drive'
      //   'https://www.googleapis.com/auth/drive.file'
      //   'https://www.googleapis.com/auth/spreadsheets'
      var SCOPE = typeof(scope) != "undefined" != "" ? scope : 'https://www.googleapis.com/auth/spreadsheets';

      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      })
      .then(function(client) {
        typeof(callback) != "undefined" ? callback(client) : googleSheetUpdateSignInStatus();
      });
}


function googleSheetUpdateSignInStatus()
 {
 	gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
 }

function handleGapiLoad(authAsked,callback) {
  gapi.load(authAsked, callback);
}

function handleClientLoad() {
  gapi.client.load('compute', CLOUD_COMPUTE_API_VERSION);;
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
  	
  }
}

function hasSignIn()
{
	return gapi.auth2.getAuthInstance().isSignedIn.get();
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
