# Calendar GitHub Commits App

This React.js application displays GitHub commits in a calendar format. Users can navigate through months, view commit messages, and get details for selected dates.

## Table of Contents

- [Introduction](#introduction)
- [Components](#components)
  - [1. api/Api.js](#1-apiapijs)
  - [2. components/Home.js](#2-componentshomejs)
  - [3. components/Calendar.js](#3-componentscalendarjs)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Additional Notes](#additional-notes)

## Introduction

This is a React.js application that serves as a calendar displaying GitHub commits. The app fetches commit data from a GitHub repository within a specified date range and presents it in a calendar format. Users can navigate through months, view commit messages, and get details for selected dates.

## Components

### 1. api/Api.js

- **fetchCommits(firstDay, lastDay):** 
  - Fetches GitHub commits within a specified date range.
  - Parameters:
    - `firstDay`: Start date.
    - `lastDay`: End date.
  - Returns: Promise containing commit data.

### 2. components/Home.js

- **State:**
  - `data`: GitHub commit data.
  - `loading`: Loading state.
  - `error`: Error state.
  - `messagesAndDates`: Processed commit messages and dates.
  - `currentMonth`: Current month for calendar display.

- **Functions:**
  - `goToPreviousMonth()`: Navigates to the previous month.
  - `goToNextMonth()`: Navigates to the next month.

- **Effects:**
  - Fetches commit data when the `currentMonth` changes.
  - Processes commit data into a readable format.

- **Rendering:**
  - Displays loading or error messages.
  - Presents navigation buttons and the calendar component.

### 3. components/Calendar.js

- **Props:**
  - `currentMonth`: Current month for calendar display.
  - `data`: Processed commit messages and dates.

- **State:**
  - `selectedDay`: Currently selected date.

- **Functions:**
  - `handleDayClick(dayDate)`: Handles click events on calendar days.

- **Rendering:**
  - Displays a table of calendar days with commit messages.
  - Shows details for the selected day when clicked.

## Usage

1. Install dependencies: `npm install`
2. Set up environment variables:
   - `REACT_APP_REPO_OWNER`: GitHub repository owner.
   - `REACT_APP_REPO_NAME`: GitHub repository name.
   - `REACT_APP_API_KEY`: GitHub API token.
3. Run the application: `npm start`

## Dependencies

- `moment`: For handling date and time.
- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: React router for navigation.

## Additional Notes

- This application utilizes the GitHub API to fetch commit data. Ensure that your GitHub API token has the necessary permissions.

