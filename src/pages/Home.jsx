// import PostCard from "../components/PostCard";

// function Home() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">All Posts</h2>

//       <div className="space-y-4">
//         <PostCard />
//         <PostCard />
//         <PostCard />
//       </div>
//     </div>
//   );
// }

// export default Home;


import PostCard from "../components/PostCard";

function Home({posts}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Posts</h2>

      <div className="space-y-4">
        <div>
        {posts.map(post=>{
          return <PostCard key={post.id} post={post}/>;
        } )}
        </div>
      </div>
    </div>
  );
}

export default Home;