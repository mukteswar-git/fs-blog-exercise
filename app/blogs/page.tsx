import { getBlogs } from "../services/blogs";

const Blogs = () => {
  let blogs = getBlogs()

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
