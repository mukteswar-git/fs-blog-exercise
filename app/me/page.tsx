import { auth } from "../auth"
import { redirect } from "next/navigation"
import { db } from "../../db"
import { users, readingList } from "../../db/schema"
import { eq } from "drizzle-orm"
import { generateToken } from "../actions/users"
import { markAsRead } from "../actions/blogs"

const Me = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!user) {
    redirect("/login")
  }

  const userReadingList = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  })

  const unreadBlogs = userReadingList.filter((item) => !item.read)
  const readBlogs = userReadingList.filter((item) => item.read)

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

        {/* Profile */}
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          My Profile
        </h2>

        <div className="space-y-3">
          <p className="text-gray-700">
            <strong className="font-semibold">Name:</strong>{" "}
            {user.name}
          </p>

          <p className="text-gray-700">
            <strong className="font-semibold">Username:</strong>{" "}
            {user.username}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Reading List */}
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          Reading List
        </h3>

        {/* Unread */}
        <h4 className="mb-3 text-base font-semibold text-gray-700">
          Unread ({unreadBlogs.length})
        </h4>

        {unreadBlogs.length > 0 ? (
          <ul className="mb-6 space-y-2">
            {unreadBlogs.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-md bg-yellow-50 px-3 py-3"
              >
                <a
                  href={`/blogs/${item.blog.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.blog.title}
                </a>

                <form action={markAsRead}>
                  <input
                    type="hidden"
                    name="id"
                    value={item.id}
                  />

                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6 text-sm text-gray-500">
            No unread blogs.
          </p>
        )}

        {/* Read */}
        <h4 className="mb-3 text-base font-semibold text-gray-700">
          Read ({readBlogs.length})
        </h4>

        {readBlogs.length > 0 ? (
          <ul className="space-y-2">
            {readBlogs.map((item) => (
              <li
                key={item.id}
                className="rounded-md bg-green-50 px-3 py-3"
              >
                <a
                  href={`/blogs/${item.blog.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.blog.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            No read blogs.
          </p>
        )}

        <hr className="my-6 border-gray-300" />

        {/* API Token */}
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          API Token
        </h3>

        <div className="mb-4 rounded-md bg-gray-50 p-3">
          <p className="mb-2 text-sm text-gray-500">
            Current token:
          </p>

          <p className="break-all rounded bg-gray-100 px-3 py-2 font-mono text-sm text-gray-700">
            {user.token || "No token has been generated yet."}
          </p>
        </div>

        <form action={generateToken}>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Generate New Token
          </button>
        </form>

      </div>
    </div>
  )
}

export default Me
