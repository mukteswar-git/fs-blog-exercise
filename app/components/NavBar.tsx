"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-5 border-b bg-white px-8 py-4 shadow-sm">
      <Link
        href="/"
        className="font-medium text-gray-700 transition-colors hover:text-blue-600"
      >
        home
      </Link>

      <Link
        href="/blogs"
        className="font-medium text-gray-700 transition-colors hover:text-blue-600"
      >
        blogs
      </Link>

      <Link
        href="/users"
        className="font-medium text-gray-700 transition-colors hover:text-blue-600"
      >
        users
      </Link>

      {session ? (
        <>
          <Link
            href="/blogs/new"
            className="font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            create new
          </Link>

          <Link
            href="/me"
            className="font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            me
          </Link>

          <span className="ml-auto text-sm text-gray-600">
            {session.user?.name}
          </span>

          <button
            onClick={() => signOut({ callbackUrl: "/blogs"})}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="ml-auto font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            login
          </Link>

          <Link
            href="/register"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            register
          </Link>
        </>
      )}
    </nav>
  )
}
