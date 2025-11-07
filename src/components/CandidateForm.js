import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        currentPosition: '',
        experience: '',
        resume: null,
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Validate fields before submit
    const validate = () => {
        let newErrors = {};

        // Text fields required
        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.position.trim()) newErrors.position = "Position Applied For is required";
        if (!formData.currentPosition.trim()) newErrors.currentPosition = "Current Position is required";
        if (!formData.experience) newErrors.experience = "Experience (Years) is required";

        // Resume validation
        if (!formData.resume) {
            newErrors.resume = "Resume file is required";
        } else if (formData.resume.type !== "application/pdf") {
            newErrors.resume = "Only PDF files are allowed";
        } else if (formData.resume.size > 5 * 1024 * 1024) {
            newErrors.resume = "File size must be less than or equal to 5 MB";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted successfully:", formData);
            // Navigate to the next page
            navigate('/instructions', { state: formData });
        } else {
            console.log("Form validation failed");
        }
    };

    return (
        <div className="container mt-4 p-4 shadow-lg rounded bg-light" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Candidate Information Form</h2>

            <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">
                    <label className="form-label">First Name<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        name="firstName"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        name="lastName"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Position Applied For *</label>
                    <select
                        name="position"
                        className={`form-control ${errors.position ? "is-invalid" : ""}`}
                        value={formData.position}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Position --</option>
                        <option value="Test Engineer">Test Engineer</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="AI Engineer">AI Engineer</option>
                    </select>
                    {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                </div>


                <div className="mb-3">
                    <label className="form-label">Current Position<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        name="currentPosition"
                        className={`form-control ${errors.currentPosition ? "is-invalid" : ""}`}
                        value={formData.currentPosition}
                        onChange={handleChange}
                        required
                    />
                    {errors.currentPosition && <div className="invalid-feedback">{errors.currentPosition}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Experience (Years)<span className="text-danger">*</span></label>
                    <input
                        type="number"
                        name="experience"
                        className={`form-control ${errors.experience ? "is-invalid" : ""}`}
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />
                    {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Upload Resume (PDF ≤ 5 MB)<span className="text-danger">*</span></label>
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf"
                        className={`form-control ${errors.resume ? "is-invalid" : ""}`}
                        onChange={handleChange}
                        required
                    />
                    {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Next
                </button>
            </form>
        </div>
    );
};

export default CandidateForm;
