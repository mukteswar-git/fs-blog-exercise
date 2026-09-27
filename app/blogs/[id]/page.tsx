import { notFound } from "next/navigation"
import { getBlogById } from "@/services/blogs"
import { increaseBlogLike } from "@/actions/blogs"

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-3xl font-bold text-gray-900">
          {blog.title}
        </h2>

        <p className="mb-5 text-gray-600">
          by{" "}
          <span className="font-medium text-gray-900">
            {blog.author}
          </span>
          {" "}— {blog.likes} likes
        </p>

        <p className="mb-6">
          <span className="font-medium text-gray-700">
            Link:{" "}
          </span>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-blue-600 hover:text-blue-800 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <form action={increaseBlogLike}>
          <input
            type="hidden"
            name="id"
            value={blog.id}
          />

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Like
          </button>
        </form>
      </article>
    </div>
  )
}

export default BlogPage
