import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Button";
import "./style.css";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    customGender: "",
    dob: "",
    email: "",
    agreeTerms: false,
  });

  const [currentUser, setCurrentUser] = useState(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Auto-format DOB
    if (name === "dob") {
      let digitsOnly = value.replace(/\D/g, "").slice(0, 8);
      let formatted = digitsOnly;
      if (digitsOnly.length > 4) {
        formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(
          2,
          4
        )}/${digitsOnly.slice(4)}`;
      } else if (digitsOnly.length > 2) {
        formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
      }
      setFormData((prev) => ({ ...prev, dob: formatted }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
      customGender: "", // Reset customGender when switching
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    const finalGender =
      formData.gender === "Others" ? formData.customGender : formData.gender;

    if (formData.gender === "Others" && !formData.customGender.trim()) {
      alert("Please specify your gender.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: formData.name,
      gender: finalGender,
      dob: formData.dob,
      email: formData.email,
    };

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = existingUsers.map((user) =>
      user.userId === currentUser?.userId ? updatedUser : user
    );

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    console.log("User Info saved:", updatedUser);

    // You can redirect or show a toast here
  };

  return (
    <div className="userinfo-container">
      <form className="userinfo-form" onSubmit={handleSubmit}>
        <h2 className="userinfo-title">Welcome to Hyperlink!</h2>
        <p className="userinfo-subtitle">Help us get to know you!</p>

        {/* Name */}
        <label className="userinfo-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="userinfo-input"
          required
        />

        {/* Gender */}
        <label className="userinfo-label">Gender</label>
        <div className="userinfo-gender-group">
          {["Male", "Female", "Others"].map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => handleGenderSelect(g)}
              className={`gender-btn ${
                formData.gender === g ? "selected" : ""
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Custom gender input if "Others" selected */}
        {formData.gender === "Others" && (
          <input
            type="text"
            name="customGender"
            placeholder="Please specify your gender"
            className="userinfo-input custom-gender-input"
            value={formData.customGender}
            onChange={handleChange}
            required
          />
        )}

        {/* DOB */}
        <label className="userinfo-label" htmlFor="dob">
          Date of Birth
        </label>
        <input
          id="dob"
          type="text"
          name="dob"
          placeholder="DD/MM/YYYY"
          value={formData.dob}
          onChange={handleChange}
          className="userinfo-input"
          required
        />
        <p className="input-hint">Type your DOB</p>

        {/* Email */}
        <label className="userinfo-label" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="abc@xyz.com"
          value={formData.email}
          onChange={handleChange}
          className="userinfo-input"
          required
        />

        {/* Terms */}
        <div className="userinfo-terms">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="checkbox"
            id="agreeTerms"
            required
          />
          <label htmlFor="agreeTerms">
            By signing up to Hyperlink, you agree to our{" "}
            <span className="terms-link">Terms & Conditions</span>
          </label>
        </div>

        {/* Submit */}
        <Button className="primary">Continue</Button>
      </form>
    </div>
  );
};

export default UserInfo;
