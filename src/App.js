import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateForm from "./components/CandidateForm";
import VideoInstructions from "./components/VideoInstructions";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateForm />} />
        <Route path="/instructions" element={<VideoInstructions />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
