import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import GetCommits from "./Api";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:date" element={<GetCommits />} />
          <Route path="/" element={<GetCommits />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
