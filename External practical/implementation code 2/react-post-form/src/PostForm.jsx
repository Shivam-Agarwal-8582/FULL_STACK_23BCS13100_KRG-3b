import React, { useState } from "react";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const postData = { title, body };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setSuccess("✅ Post submitted successfully!");
        setTitle("");
        setBody("");
      } else {
        setSuccess("❌ Failed to submit post.");
      }
    } catch (error) {
      setSuccess("❌ Error submitting post.");
    }
  }

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <textarea
          placeholder="Enter Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="4"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        ></textarea>

        <button type="submit" style={{ padding: "8px 12px" }}>
          Submit
        </button>
      </form>

      {success && <p style={{ marginTop: "10px" }}>{success}</p>}
    </div>
  );
}

export default PostForm;
