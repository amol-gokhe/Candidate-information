import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function VideoInstructions({ onNext }) {
    const videoRef = useRef(null);
    const chunksRef = useRef([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [recording, setRecording] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(true);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    // Ask for camera and microphone permission
    const requestPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 200);

            const recorder = new MediaRecorder(stream);
            recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/mp4" });
                const url = URL.createObjectURL(blob);
                setVideoURL(url);
                chunksRef.current = [];
                clearInterval(intervalId);
                setTimer(0); // Reset timer when stopped
            };

            setMediaRecorder(recorder);
            setPermissionGranted(true);
            setShowPermissionPopup(false);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Camera or microphone access denied. Please allow access to continue.");
        }
    };

    // Start recording
    const startRecording = () => {
        if (!mediaRecorder) return;
        setVideoURL("");
        chunksRef.current = [];
        mediaRecorder.start();
        setRecording(true);
        setTimer(0);

        let time = 0;
        const id = setInterval(() => {
            time++;
            setTimer(time);
            if (time >= 90) stopRecording();
        }, 1000);
        setIntervalId(id);
    };

    // Stop recording
    const stopRecording = () => {
        if (!mediaRecorder || mediaRecorder.state !== "recording") return;
        mediaRecorder.stop();
        setRecording(false);
    };

    // Re-record
    const handleRerecord = () => {
        setVideoURL("");
        setTimer(0);
    };

    // Submit


    // inside component:
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!videoURL) {
            setError("Please record a video before submitting.");
            return;
        }
        navigate("/review");
    };


    return (
        <div className="container mt-5">
            <h3 className="mb-3">Video Recording Instructions</h3>
            <ul>
                <li>Give a short introduction about yourself.</li>
                <li>Why are you interested in this position?</li>
                <li>Highlight your relevant experience.</li>
                <li>Describe your long-term career goals.</li>
            </ul>

            {showPermissionPopup && (
                <div className="alert alert-warning text-center">
                    <h5>Camera & Microphone Permission Needed</h5>
                    <p>To continue, please allow access to your camera and microphone.</p>
                    <button className="btn btn-primary" onClick={requestPermission}>
                        Allow Access
                    </button>
                </div>
            )}

            {permissionGranted && (
                <div className="text-center">
                    <video
                        ref={videoRef}
                        width="480"
                        height="360"
                        autoPlay
                        muted
                        className="border rounded mb-3"
                    ></video>

                    <div className="mb-3">
                        <h5>Time: {timer}s / 90s</h5>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        {!recording && !videoURL && (
                            <button className="btn btn-success" onClick={startRecording}>
                                Start Recording
                            </button>
                        )}

                        {recording && (
                            <button className="btn btn-danger" onClick={stopRecording}>
                                Stop Recording
                            </button>
                        )}

                        {videoURL && (
                            <>
                                <button className="btn btn-secondary" onClick={handleRerecord}>
                                    Re-record
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </>
                        )}
                    </div>

                    {videoURL && (
                        <div className="mt-4">
                            <h5>Recorded Video Preview:</h5>
                            <video
                                src={videoURL}
                                width="480"
                                height="360"
                                controls
                                className="border rounded"
                            ></video>
                        </div>
                    )}

                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            )}
        </div>
    );
}

export default VideoInstructions;
