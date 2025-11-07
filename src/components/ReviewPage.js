import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state;

    if (!data) {
        // If no data, redirect to form page
        navigate("/");
        return null;
    }

    const { firstName, lastName, position, currentPosition, experience, resume, videoURL } = data;

    // Convert resume file object to downloadable link
    const resumeLink = resume ? URL.createObjectURL(resume) : null;

    return (
        <div className="container mt-4 p-4 shadow-lg rounded bg-light" style={{ maxWidth: "700px" }}>
            <h2 className="text-center mb-4">Review Candidate Information</h2>

            <div className="mb-3">
                <h5>Candidate Details:</h5>
                <ul className="list-group">
                    <li className="list-group-item"><strong>First Name:</strong> {firstName}</li>
                    <li className="list-group-item"><strong>Last Name:</strong> {lastName}</li>
                    <li className="list-group-item"><strong>Position Applied For:</strong> {position}</li>
                    <li className="list-group-item"><strong>Current Position:</strong> {currentPosition}</li>
                    <li className="list-group-item"><strong>Experience (Years):</strong> {experience}</li>
                </ul>
            </div>

            {resumeLink && (
                <div className="mb-3">
                    <h5>Resume:</h5>
                    <a href={resumeLink} download={`${firstName}_${lastName}_Resume.pdf`} className="btn btn-secondary">
                        Download Resume
                    </a>
                </div>
            )}

            {videoURL && (
                <div className="mb-3">
                    <h5>Recorded Video:</h5>
                    <video src={videoURL} controls style={{ width: "100%", borderRadius: "8px" }}></video>
                </div>
            )}

            <div className="text-center">
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                    Go Back to Form
                </button>
            </div>
        </div>
    );
};

export default ReviewPage;
