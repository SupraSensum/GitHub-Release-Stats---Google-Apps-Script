# GitHub Release Stats - Google Apps Script

This repository contains a Google Apps Script project that automatically pulls GitHub release data (including individual asset download counts) from a repository (even private ones) and logs it into a Google Sheets file.

## Features

- **Fetch Releases Data:** Retrieves all releases from a specified GitHub repository.
- **Authentication:** Uses a GitHub Personal Access Token to access private repositories.
- **Record Stats:** Writes a row for every asset (with a full timestamp) into a "Versions" sheet.
- **Total Downloads:** Appends a cumulative download total into a "Total" sheet.
- **Script Properties:** Stores configuration settings (Spreadsheet ID, GitHub API URL, and GitHub Token) securely in Script Properties.
- **Automatic Sheet Creation:** Ensures that both the "Versions" and "Total" sheets exist (creates them if missing).
- **Time-based Trigger:** Can be scheduled to run automatically even when the sheet is not open.

## Setup Instructions

1. **Create a Google Sheet:**
   - Create a new Google Sheets file.
   - (Optional) Manually create two tabs named `Versions` and `Total` or let the script create them automatically.

2. **Add the Script to Your Spreadsheet:**
   - In the Google Sheet, go to **Extensions > Apps Script**.
   - Delete any existing code and paste in the contents of `Code.gs` from this repository.

3. **Set Up Script Properties:**
   - In the Apps Script editor, click on **File > Project properties > Script properties**.
   - Add the following properties:
     - `SPREADSHEET_ID`: Your spreadsheet ID (for example, if your sheet URL is `https://docs.google.com/spreadsheets/d/1fOJ_wSJ-RF_beKMSWWf7DKYOrNjmjRWSJZ12vOiANpY/edit`, then the ID is `1fOJ_wSJ-RF_beKMSWWf7DKYOrNjmjRWSJZ12vOiANpY`).
     - `GITHUB_API_URL`: The GitHub API endpoint for releases (e.g., `https://api.github.com/repos/Rocketman-Tech/rcc/releases`).
     - `GITHUB_TOKEN`: Your GitHub Personal Access Token with the appropriate permissions.

4. **Set Up a Time-based Trigger:**
   - In the Apps Script editor, click on the **Triggers (clock icon)**.
   - Create a trigger for the `recordStats` function to run automatically (for example, daily).

5. **Test the Script:**
   - Run the `recordStats` function manually from the Apps Script editor.
   - Check the execution logs and your Sheets to verify that data is being recorded correctly in both the `Versions` and `Total` sheets.

## File Overview

- **Code.gs:** Contains the complete Google Apps Script code for fetching data from GitHub and recording it in Google Sheets.

## Inspiration

- [Tracking GitHub downloads using Google Sheets](https://jpassing.com/2021/04/17-tracking-github-downloads-using-google-sheets/)
- [gh-release-stats](https://github.com/RamiAwar/gh-release-stats/blob/main/index.html)
- ChatGPT (lol)
