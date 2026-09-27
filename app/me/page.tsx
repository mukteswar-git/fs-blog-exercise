import { auth } from "../auth"
import { redirect } from "next/navigation"
import { db } from "../../db"
import { users, readingList } from "../../db/schema"
import { eq } from "drizzle-orm"
import { generateToken } from "../actions/users"

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

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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

        <hr className="my-6 border-gray-200" />

        <h3 className="mb-4 text-xl font-bold text-gray-800">
          API Token
        </h3>

        <div className="mb-5 rounded-md bg-gray-50 p-4">
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
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Generate New Token
          </button>
        </form>

        <hr className="my-6 border-gray-200" />

        <h3 className="mb-4 text-xl font-bold text-gray-800">
          Reading List
        </h3>

        {userReadingList.length > 0 ? (
          <ul className="space-y-3">
            {userReadingList.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-gray-200 p-4"
              >
                <a
                  href={`/blogs/${item.blog.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.blog.title}
                </a>

                <p className="mt-1 text-sm text-gray-500">
                  by {item.blog.author}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Your reading list is empty.
          </p>
        )}
      </div>
    </div>
  )
}

export default Me
