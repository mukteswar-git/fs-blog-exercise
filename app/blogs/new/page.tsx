"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/actions/blogs"
import { useNotification } from "@/components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(
    createBlog,
    {
      error: "",
      success: false,
      values: {
        title: "",
        author: "",
        url: "",
      },
    }
  )

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="mx-auto max-w-xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">
        Create a new blog
      </h2>

      <form
        className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        action={formAction}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            required
            minLength={5}
            defaultValue={state.values?.title}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>

          <input
            id="author"
            type="text"
            name="author"
            required
            minLength={5}
            defaultValue={state.values?.author}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL
          </label>

          <input
            id="url"
            type="url"
            name="url"
            required
            minLength={5}
            defaultValue={state.values?.url}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          data-testid="create-blog-button"
          className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Create
        </button>

        {state.error && (
          <p className="text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}
      </form>
    </div>
  )
}

export default NewBlog
