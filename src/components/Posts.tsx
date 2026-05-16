const Posts = () => {
  // Generate a lot of posts
  const posts = Array.from({ length: 100000 }, (_, idx) => `Post ${idx + 1}`);

  return (
    <div className="flex flex-wrap gap-2 justify-center-safe w-fit">
      {posts.map((post) => (
        <div key={post} className="post p-4 border-2 border-amber-800">
          {post}
        </div>
      ))}
    </div>
  );
};

export default Posts;

// For these kinds of situation, we need to use the useTransition() hook.
// We are not going to use the useTransition hook in our day to day life, but if you want to render a lot of data, like a million data, you may want to use the useTransition() hook
