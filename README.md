# GitHub Release Stats - Google Apps Script

This repository contains a Google Apps Script project that automatically pulls GitHub release data (including individual asset download counts) from a repository (even private ones) and logs it into a Google Sheets file.

## Features

- **Fetch Releases Data:** Retrieves all releases from a given GitHub repository.
- **Authentication:** Uses a GitHub Personal Access Token to access private repositories.
- **Record Stats:** Writes a row for every asset found (with full timestamp) into a "Versions" sheet.
- **Total Downloads:** Appends a cumulative download total into a "Total" sheet.
- **Time-based Trigger:** Can be scheduled to run automatically even when the sheet is closed.

## Setup Instructions

1. **Create a Google Sheet:**  
   - Create a new Google Sheets file.
   - Add two tabs named `Versions` and `Total`.

2. **Add the Script to Your Spreadsheet:**  
   - In the Google Sheet, go to **Extensions > Apps Script**.
   - Replace any code with the contents of `Code.gs` from this repo.

3. **Set Your Spreadsheet ID:**  
   - In `Code.gs`, update the `spreadsheetId` variable with your Google Sheets file ID.  
     (For example, if your sheet URL is `https://docs.google.com/spreadsheets/d/1fOJ_wSJ-RF_beKMSWWf7DKYOrNjmjRWSJZ12vOiANpY/edit`, then the ID is `1fOJ_wSJ-RF_beKMSWWf7DKYOrNjmjRWSJZ12vOiANpY`.)

4. **Configure GitHub Token:**  
   - Replace the token in the script with your GitHub Personal Access Token.  

5. **Set Up a Time-based Trigger:**  
   - In the Apps Script editor, select **Triggers (clock icon)**.
   - Create a trigger for the `recordStats` function to run once a day (or as needed).

6. **Run the Script:**  
   - Test by running the `recordStats` function manually from the Apps Script editor.
   - Check the execution logs and your Sheets to see the recorded stats.

## File Overview

- **Code.gs:** Contains the full Google Apps Script code for fetching data from GitHub and recording it in Google Sheets.
