// Api.js
import moment from "moment";

export async function fetchCommits(firstDay, lastDay) {
  const apiUrl = `https://api.github.com/repos/${process.env.REACT_APP_REPO_OWNER}/${process.env.REACT_APP_REPO_NAME}/commits?since=${firstDay.toISOString()}&until=${lastDay.toISOString()}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `token ${process.env.REACT_APP_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
