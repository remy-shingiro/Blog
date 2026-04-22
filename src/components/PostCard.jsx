import { Link } from "react-router-dom";

function PostCard({post}) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-3">
        {post.content}
      </p>

      <Link
        to={`/post/${post.id}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;