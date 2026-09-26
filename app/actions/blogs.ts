"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, increaseLike } from "../services/blogs"
import { auth } from "@/auth"

type CreateBlogState = {
  error: string
  values?: {
    title: string
    author: string
    url: string
  }
}

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (!title || title.length < 5) {
    return {
      error: "Title must be at least 5 characters long",
      values: { title, author, url }
    }
  }

  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long",
      values: { title, author, url }
    }
  }
  
  if (!url || url.length < 5) {
    return {
      error: "URL must be at least 5 characters long",
      values: { title, author, url }
    }
  }
  
  await addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const increaseBlogLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await increaseLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
