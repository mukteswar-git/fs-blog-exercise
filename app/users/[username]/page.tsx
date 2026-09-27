import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsername } from "@/services/users"

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">
        {user.name}
      </h2>

      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        Blogs
      </h3>

      {user.blogs.length > 0 ? (
        <ul className="space-y-3">
          {user.blogs.map((blog) => (
            <li
              key={blog.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          This user has not created any blogs yet.
        </p>
      )}
    </div>
  )
}

export default UserPage
