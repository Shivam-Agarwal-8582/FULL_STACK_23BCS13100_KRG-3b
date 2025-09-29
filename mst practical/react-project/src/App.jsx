import React, { useState, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submittedData, setSubmittedData] = useState(null);

  // Log submitted data whenever it changes
  useEffect(() => {
    if (submittedData) {
      console.log("Submitted Data:", submittedData);
    }
  }, [submittedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); // store submitted data in state
    setFormData({ name: "", email: "" }); // clear form after submit
  };

  return (
    <div className="p-4">
      <h2>React Form Example</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
