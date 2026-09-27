import { notFound } from "next/navigation"
import { eq, and } from "drizzle-orm"
import { getBlogById } from "@/services/blogs"
import {
  increaseBlogLike,
  addToReadingList,
} from "@/actions/blogs"
import { auth } from "@/auth"
import { db } from "../../../db"
import { users, readingList } from "../../../db/schema"

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

  const session = await auth()

  let alreadyInReadingList = false

  if (session?.user?.email) {
    const user = await db.query.users.findFirst({
      where: eq(users.username, session.user.email),
    })

    if (user) {
      const existing = await db.query.readingList.findFirst({
        where: and(
          eq(readingList.userId, user.id),
          eq(readingList.blogId, blog.id),
        ),
      })

      alreadyInReadingList = !!existing
    }
  }

  const isOwnBlog =
    session?.user?.email === blog.author

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <article 
        data-testid="blog-detail"
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2
          data-testid="blog-title"
          className="mb-3 text-3xl font-bold text-gray-900"
        >
          {blog.title}
        </h2>

        <p className="mb-5 text-gray-600">
          by{" "}
          <span
            data-testid="blog-author"
            className="font-medium text-gray-900"
          >
            {blog.author}
          </span>
          {" "}— {blog.likes} likes
        </p>

        <div className="mb-6 flex gap-2">
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

          {session && !isOwnBlog && !alreadyInReadingList && (
            <form action={addToReadingList}>
              <input
                type="hidden"
                name="id"
                value={blog.id}
              />

              <button
                type="submit"
                data-testid="add-to-reading-list-button"
                className="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
              >
                Add to reading list
              </button>
            </form>
          )}
        </div>

        <p>
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
      </article>
    </div>
  )
}

export default BlogPage
