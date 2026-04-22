import { useState } from "react";



function CreatePost() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

      <form className="space-y-4">
        <input
          type="text"
          //handling post title
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
        value={content}
        //handling post texts
        onChange={(e)=>setContent(e.target.value)}
          placeholder="Write your content here..."
          rows="6"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost;