import Link from "next/link"
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  let blogs = getBlogs()

  const sortedBlogs = [...blogs].sort(
    (a, b) => b.likes - a.likes
  );

  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}> 
              <b>{blog.title}</b>
            </Link>
            {" "} by <b>{blog.author}</b>
            {" "} - {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
