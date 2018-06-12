const functions =   require('firebase-functions');
const express   =   require('express');
const app       =   express();
const GoogleSpreadsheet = require('google-spreadsheet');
//const async = require('async');
const firebase = require('firebase');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


//  Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6oUCxBWepqvvcK5WP37ihPv_hHznQvD8",
    authDomain: "sheet-61cd0.firebaseapp.com",
    databaseURL: "https://sheet-61cd0.firebaseio.com",
    projectId: "sheet-61cd0",
    storageBucket: "sheet-61cd0.appspot.com",
    messagingSenderId: "927900559503"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  app.get('/test', (req, res) =>  {
    res.send({'status':'200','name':'Hello word, a node js application'});
});

app.get('/spreadsheet', (req, res)  =>  {
  var q = '';

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'credentials.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1Lpbx-LQQTh-lF2E1lQmPnqZhvT2bWfQ9gxBX-qGBz_M',
    range: 'A1:N9',
    //valueRenderOption: 'UNFORMATTED_VALUES'
    //majorDimension: 'COLUMNS'
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    if (rows.length) {
      rows.map((row) => {
         //res.send(rows);
        //console.log(row.length);
       //res.send({'result':data.values[1]});
        // let result = '';
        //  for(i=0; i < data.values.length; i++){
        //    var k = '';
        //   for(j = 0; j < row.length; j++ ){
        //     k = data.values[i][j];
        //   }
        //   result =  data.values[0] + ':' + k;
        //  }
        //  res.send({'result': {result}});


        //  var ddata = {"range":"'avgPrice-region-WALES-by-pcArea-new-1995.csv'!A1:N9","majorDimension":"ROWS","values":[["Postcode","Detached","Sales","Semi-det","Sales","Terraced","Sales","Flat/mais","Sales","Overall average","Total sales","Type","Period","Region"],["CF","93177","280","56037","179","49039","147","48792","140","67238","746","New","1995","WALES"],["CH","86963","11","48811","9","40850","2","41500","2","65025","24","New","1995","WALES"],["HR","0","0","0","0","71500","1","0","0","71500","1","New","1995","WALES"],["LD","70927","33","53489","10","0","0","0","0","66872","43","New","1995","WALES"],["LL","72727","144","50913","59","47330","30","42193","21","62136","254","New","1995","WALES"],["NP","87351","243","50333","120","38132","68","26833","6","68696","437","New","1995","WALES"],["SA","84966","168","50014","120","42617","66","72081","30","65758","384","New","1995","WALES"],["SY","62147","61","49425","37","39044","37","60587","12","53002","147","New","1995","WALES"]]};
        // for( i = 1; i < 9; i++){
        //   for(j=0; j < 14; j++){
        //     //k += i;
        //      q = {
        //       'Postcode'                : ddata.values[i][0],
        //       'Detached Avg'            : ddata.values[i][1],
        //       'Detached Sales'          : ddata.values[i][2],
        //       'Semi-detached Avg'       : ddata.values[i][3],
        //       'Semi-detached Sales'     : ddata.values[i][4],
        //       'Terraced Avg'            : ddata.values[i][5],
        //       'Terraced Sales'          : ddata.values[i][6],
        //       'Flat Avg'                : ddata.values[i][7],
        //       'Flat Sales'              : ddata.values[i][8],
        //       'Overall Avg'             : ddata.values[i][9],
        //       'Total Sales'             : ddata.values[i][10],
        //       'Type'                    : ddata.values[i][11],
        //       'Period'                  : ddata.values[i][12],
        //       'Region'                  : ddata.values[i][13],
        //       };
        //   }
        //   console.log(q);
        //   //firebase.database().ref().set(q);
        // }
        // console.log(data.length);
        var q = {
          '0' : {
            'Postcode'                : data.values[1][0],
            'Detached Avg'            : data.values[1][1],
            'Detached Sales'          : data.values[1][2],
            'Semi-detached Avg'       : data.values[1][3],
            'Semi-detached Sales'     : data.values[1][4],
            'Terraced Avg'            : data.values[1][5],
            'Terraced Sales'          : data.values[1][6],
            'Flat Avg'                : data.values[1][7],
            'Flat Sales'              : data.values[1][8],
            'Overall Avg'             : data.values[1][9],
            'Total Sales'             : data.values[1][10],
            'Type'                    : data.values[1][11],
            'Period'                  : data.values[1][12],
            'Region'                  : data.values[1][13],
          },
          '1' :{
            'Postcode'                : data.values[2][0],
            'Detached Avg'            : data.values[2][1],
            'Detached Sales'          : data.values[2][2],
            'Semi-detached Avg'       : data.values[2][3],
            'Semi-detached Sales'     : data.values[2][4],
            'Terraced Avg'            : data.values[2][5],
            'Terraced Sales'          : data.values[2][6],
            'Flat Avg'                : data.values[2][7],
            'Flat Sales'              : data.values[2][8],
            'Overall Avg'             : data.values[2][9],
            'Total Sales'             : data.values[2][10],
            'Type'                    : data.values[2][11],
            'Period'                  : data.values[2][12],
            'Region'                  : data.values[2][13],
          },
          '2' :{
            'Postcode'                : data.values[3][0],
            'Detached Avg'            : data.values[3][1],
            'Semi-detached Avg'       : data.values[3][3],
            'Detached Sales'          : data.values[3][2],
            'Semi-detached Sales'     : data.values[3][4],
            'Terraced Avg'            : data.values[3][5],
            'Terraced Sales'          : data.values[3][6],
            'Flat Avg'                : data.values[3][7],
            'Flat Sales'              : data.values[3][8],
            'Overall Avg'             : data.values[3][9],
            'Total Sales'             : data.values[3][10],
            'Type'                    : data.values[3][11],
            'Period'                  : data.values[3][12],
            'Region'                  : data.values[3][13],
          },
          '3' :{
            'Postcode'                : data.values[4][0],
            'Detached Avg'            : data.values[4][1],
            'Detached Sales'          : data.values[4][2],
            'Semi-detached Avg'       : data.values[4][3],
            'Semi-detached Sales'     : data.values[4][4],
            'Terraced Avg'            : data.values[4][5],
            'Terraced Sales'          : data.values[4][6],
            'Flat Avg'                : data.values[4][7],
            'Flat Sales'              : data.values[4][8],
            'Overall Avg'             : data.values[4][9],
            'Total Sales'             : data.values[4][10],
            'Type'                    : data.values[4][11],
            'Period'                  : data.values[4][12],
            'Region'                  : data.values[4][13],
          },
          '4' :{
            'Postcode'                : data.values[5][0],
            'Detached Avg'            : data.values[5][1],
            'Detached Sales'          : data.values[5][2],
            'Semi-detached Avg'       : data.values[5][3],
            'Semi-detached Sales'     : data.values[5][4],
            'Terraced Avg'            : data.values[5][5],
            'Terraced Sales'          : data.values[5][6],
            'Flat Avg'                : data.values[5][7],
            'Flat Sales'              : data.values[5][8],
            'Overall Avg'             : data.values[5][9],
            'Total Sales'             : data.values[5][10],
            'Type'                    : data.values[5][11],
            'Period'                  : data.values[5][12],
            'Region'                  : data.values[5][13],
          },
          '5' : {
            'Postcode'                : data.values[6][0],
            'Detached Avg'            : data.values[6][1],
            'Detached Sales'          : data.values[6][2],
            'Semi-detached Avg'       : data.values[6][3],
            'Semi-detached Sales'     : data.values[6][4],
            'Terraced Avg'            : data.values[6][5],
            'Terraced Sales'          : data.values[6][6],
            'Flat Avg'                : data.values[6][7],
            'Flat Sales'              : data.values[6][8],
            'Overall Avg'             : data.values[6][9],
            'Total Sales'             : data.values[6][10],
            'Type'                    : data.values[6][11],
            'Period'                  : data.values[6][12],
            'Region'                  : data.values[6][13],
          },
          '6' : {
            'Postcode'                : data.values[7][0],
            'Detached Avg'            : data.values[7][1],
            'Detached Sales'          : data.values[7][2],
            'Semi-detached Avg'       : data.values[7][3],
            'Semi-detached Sales'     : data.values[7][4],
            'Terraced Avg'            : data.values[7][5],
            'Terraced Sales'          : data.values[7][6],
            'Flat Avg'                : data.values[7][7],
            'Flat Sales'              : data.values[7][8],
            'Overall Avg'             : data.values[7][9],
            'Total Sales'             : data.values[7][10],
            'Type'                    : data.values[7][11],
            'Period'                  : data.values[7][12],
            'Region'                  : data.values[7][13],
          },
          '7' :{
            'Postcode'                : data.values[8][0],
            'Detached Avg'            : data.values[8][1],
            'Detached Sales'          : data.values[8][2],
            'Semi-detached Avg'       : data.values[8][3],
            'Semi-detached Sales'     : data.values[8][4],
            'Terraced Avg'            : data.values[8][5],
            'Terraced Sales'          : data.values[8][6],
            'Flat Avg'                : data.values[8][7],
            'Flat Sales'              : data.values[8][8],
            'Overall Avg'             : data.values[8][9],
            'Total Sales'             : data.values[8][10],
            'Type'                    : data.values[8][11],
            'Period'                  : data.values[8][12],
            'Region'                  : data.values[8][13],
          },
          '8' :{
            'Postcode'                : data.values[9][0],
            'Detached Avg'            : data.values[9][1],
            'Detached Sales'          : data.values[9][2],
            'Semi-detached Avg'       : data.values[9][3],
            'Semi-detached Sales'     : data.values[9][4],
            'Terraced Avg'            : data.values[9][5],
            'Terraced Sales'          : data.values[9][6],
            'Flat Avg'                : data.values[9][7],
            'Flat Sales'              : data.values[9][8],
            'Overall Avg'             : data.values[9][9],
            'Total Sales'             : data.values[9][10],
            'Type'                    : data.values[9][11],
            'Period'                  : data.values[9][12],
            'Region'                  : data.values[9][13],
          }
        };
        firebase.database().ref().set(q);
        res.send(q);
       // console.log(row.length);
      });
    } else {
      console.log('No data found.');
    }
  });
}
// var j = '';
// var ddata = {"range":"'avgPrice-region-WALES-by-pcArea-new-1995.csv'!A1:N9","majorDimension":"ROWS","values":[["Postcode","Detached","Sales","Semi-det","Sales","Terraced","Sales","Flat/mais","Sales","Overall average","Total sales","Type","Period","Region"],["CF","93177","280","56037","179","49039","147","48792","140","67238","746","New","1995","WALES"],["CH","86963","11","48811","9","40850","2","41500","2","65025","24","New","1995","WALES"],["HR","0","0","0","0","71500","1","0","0","71500","1","New","1995","WALES"],["LD","70927","33","53489","10","0","0","0","0","66872","43","New","1995","WALES"],["LL","72727","144","50913","59","47330","30","42193","21","62136","254","New","1995","WALES"],["NP","87351","243","50333","120","38132","68","26833","6","68696","437","New","1995","WALES"],["SA","84966","168","50014","120","42617","66","72081","30","65758","384","New","1995","WALES"],["SY","62147","61","49425","37","39044","37","60587","12","53002","147","New","1995","WALES"]]};
// for( i = 1; i < 9; i++){
//   for(j=0; j < 14; j++){
//     //k += i;
//      q = {
//       'Postcode'                : ddata.values[i][0],
//       'Detached Avg'            : ddata.values[i][1],
//       'Detached Sales'          : ddata.values[i][2],
//       'Semi-detached Avg'       : ddata.values[i][3],
//       'Semi-detached Sales'     : ddata.values[i][4],
//       'Terraced Avg'            : ddata.values[i][5],
//       'Terraced Sales'          : ddata.values[i][6],
//       'Flat Avg'                : ddata.values[i][7],
//       'Flat Sales'              : ddata.values[i][8],
//       'Overall Avg'             : ddata.values[i][9],
//       'Total Sales'             : ddata.values[i][10],
//       'Type'                    : ddata.values[i][11],
//       'Period'                  : ddata.values[i][12],
//       'Region'                  : ddata.values[i][13],
//       };
      
//   }
//   console.log(q);
//   res.send(q + ',');
  //firebase.database().ref().set(q);
//}
});

exports.app = functions.https.onRequest(app);
