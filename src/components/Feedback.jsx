import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/feedback/`;

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseMsg("");

    try {
      const res = await axios.post(API_URL, formData);
      setResponseMsg(res.data.message);

      // reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        rating: 5,
      });
    } catch (err) {
      setError("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Feedback Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            {[1,2,3,4,5].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {responseMsg && (
          <p className="text-green-600 mt-3 text-center">
            {responseMsg}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-3 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;