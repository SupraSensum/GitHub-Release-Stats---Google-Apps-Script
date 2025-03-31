function recordStats() {
  // 0. Replace with your spreadsheet ID
  var spreadsheetId = "YOUR_SPREADSHEET_ID";

  // 1. Replace with the API endpoint for your repository’s releases
  var url = "https://api.github.com/repos/{owner}/{repo}/releases";
  
  // 2. Replade with your GitHub token to access private repos
  var token = "YOUR_GITHUB_TOKEN";  
  var options = {
    'muteHttpExceptions': true,
    'headers': {
      'User-Agent': 'Google Apps Script',
      'Authorization': 'token ' + token
    }
  };
  
  // 3. Fetch data from GitHub’s Releases API
  var response = UrlFetchApp.fetch(url, options);
  
  // 4. Handle non-200 responses
  if (response.getResponseCode() !== 200) {
    Logger.log("Error fetching releases: " + response.getContentText());
    return;
  }
  
  // 5. Parse JSON
  var json = response.getContentText();
  var releases = JSON.parse(json);
  Logger.log("Fetched %d releases", releases.length);
  
  // 6. Open the spreadsheet explicitly
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var versionsSheet = ss.getSheetByName("Versions");
  var mainSheet = ss.getSheetByName("Total");

  // Get full timestamp (UTC)
  var timestamp = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  // 7. Loop through releases and assets
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
  
  // 8. Log total downloads and append to the Total sheet
  Logger.log("Total downloads: %d", totalDownloads);
  mainSheet.appendRow([
    timestamp,
    totalDownloads
  ]);
}
