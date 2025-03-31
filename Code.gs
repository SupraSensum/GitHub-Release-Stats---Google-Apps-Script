function recordStats() {
  // Get values from Script Properties
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty("SPREADSHEET_ID");
  var url = props.getProperty("GITHUB_API_URL");
  var token = props.getProperty("GITHUB_TOKEN");
  
  if (!spreadsheetId || !url || !token) {
    Logger.log("Missing one or more script properties. Please set SPREADSHEET_ID, GITHUB_API_URL, and GITHUB_TOKEN.");
    return;
  }
  
  // Set up fetch options with proper headers
  var options = {
    'muteHttpExceptions': true,
    'headers': {
      'User-Agent': 'Google Apps Script',
      'Authorization': 'token ' + token
    }
  };
  
  // Fetch data from GitHub Releases API
  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() !== 200) {
    Logger.log("Error fetching releases: " + response.getContentText());
    return;
  }
  
  // Parse JSON data
  var json = response.getContentText();
  var releases = JSON.parse(json);
  Logger.log("Fetched %d releases", releases.length);
  
  // Open the spreadsheet by ID
  var ss = SpreadsheetApp.openById(spreadsheetId);
  
  // Ensure the Versions sheet exists; create it if not
  var versionsSheet = ss.getSheetByName("Versions");
  if (!versionsSheet) {
    versionsSheet = ss.insertSheet("Versions");
    Logger.log("Versions sheet not found. Created new sheet 'Versions'.");
  }
  
  // Ensure the Total sheet exists; create it if not
  var mainSheet = ss.getSheetByName("Total");
  if (!mainSheet) {
    mainSheet = ss.insertSheet("Total");
    Logger.log("Total sheet not found. Created new sheet 'Total'.");
  }
  
  // Get full timestamp (UTC) in ISO format
  var timestamp = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  // Loop through releases and assets; record download counts
  var totalDownloads = 0;
  for (var i = 0; i < releases.length; i++) {
    for (var j = 0; j < releases[i].assets.length; j++) {
      totalDownloads += releases[i].assets[j].download_count;
      
      // Append each asset’s download count to the Versions sheet
      versionsSheet.appendRow([
        timestamp,
        releases[i].tag_name,
        releases[i].assets[j].download_count
      ]);
      
      // Log asset info
      Logger.log(
        "Release %s (%s): %s downloads",
        releases[i].tag_name,
        releases[i].assets[j].name,
        releases[i].assets[j].download_count
      );
    }
  }
  
  // Log total downloads and append to the Total sheet
  Logger.log("Total downloads: %d", totalDownloads);
  mainSheet.appendRow([
    timestamp,
    totalDownloads
  ]);
}
