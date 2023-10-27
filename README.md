# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Configuration

This application requires specific environment variables to be set in a `.env` file to work with GitHub repositories. You need to define the following variables in your `.env` file:

- `REACT_APP_REPO_OWNER`: The owner or organization name of the target GitHub repository.
- `REACT_APP_REPO_NAME`: The name of the target GitHub repository.

Make sure to set these variables correctly to ensure the application functions as expected. You can obtain these values from your GitHub repository's URL. For example, if your GitHub repository URL is `https://github.com/your-username/your-repo`, then `your-username` is the `REACT_APP_REPO_OWNER`, and `your-repo` is the `REACT_APP_REPO_NAME`.
