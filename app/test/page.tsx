"use client";

import { useState } from "react";

export default function UpdateNotePage() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    if (!id || !title || !content) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ Error: ${data.error || "Something went wrong"}`);
      } else {
        setMessage(`✅ Note updated: ${data.title}`);
      }
    } catch (err: any) {
      setMessage(`❌ Request failed: ${err.message}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Update a Note</h1>

        <input
          type="text"
          placeholder="Note ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-3"
        />

        <input
          type="text"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-3"
        />

        <textarea
          placeholder="New Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-3"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
        >
          Update Note
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
