import Link from "next/link"
import { getUsers } from "@/services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">
        Users
      </h2>

      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <Link
              href={`/users/${user.username}`}
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
