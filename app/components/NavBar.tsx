"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-4 border-b px-6 py-4">
      <Link
        href="/"
        className="font-medium text-gray-800 hover:text-blue-600"
      >
        Home
      </Link>

      <Link
        href="/blogs"
        className="font-medium text-gray-800 hover:text-blue-600"
      >
        Blogs
      </Link>

      <Link
        href="/users"
        className="font-medium text-gray-800 hover:text-blue-600"
      >
        Users
      </Link>

      {session ? (
        <>
          <Link
            href="/blogs/new"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            Create new
          </Link>

          <span className="ml-auto text-sm text-gray-600">
            {session.user?.name}
          </span>

          <button
            onClick={() => signOut()}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="ml-auto font-medium text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Register
          </Link>
        </>      
      )}
    </nav>
  )
}
