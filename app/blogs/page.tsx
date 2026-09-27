import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams

  const blogs = await getBlogs()

  const sortedBlogs = [...blogs]
    .filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">
        Blogs
      </h2>

      <form
        method="GET"
        className="mb-8 flex max-w-xl items-center gap-2"
      >
        <input
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <ul className="space-y-3">
        {sortedBlogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              {blog.title}
            </Link>

            <span className="text-gray-600">
              {" "}by{" "}
              <span className="font-medium text-gray-900">
                {blog.author}
              </span>
              {" "}— {blog.likes} likes
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
