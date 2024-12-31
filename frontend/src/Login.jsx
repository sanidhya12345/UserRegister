/** @format */

import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
