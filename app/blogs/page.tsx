import Link from "next/link"
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string}>;
}) => {
  const { filter = "" } = await searchParams;

  const blogs = await getBlogs()

  const sortedBlogs = [...blogs]
    .filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2 className="mt-4">Blogs</h2>

      <form method="GET" className="flex items-center gap-2">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
          className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <ul className="mt-4">
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
