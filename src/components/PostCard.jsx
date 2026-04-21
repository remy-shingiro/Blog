import { Link } from "react-router-dom";

function PostCard() {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">Post Title</h2>
      <p className="text-gray-600 mb-3">
        This is a short preview of the blog post...
      </p>

      <Link
        to="/post/1"
        className="text-blue-600 font-medium hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;