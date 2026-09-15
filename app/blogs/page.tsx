const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Smith",
    url: "https://example.com/getting-started-nextjs",
    likes: 24,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    author: "Sarah Johnson",
    url: "https://example.com/react-server-components",
    likes: 42,
  },
  {
    id: 3,
    title: "Building APIs with Next.js",
    author: "Michael Brown",
    url: "https://example.com/nextjs-apis",
    likes: 18,
  },
];

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>
              <b>{blog.title}</b>
            </a>{" "}
            by <b>{blog.author}</b> — {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
