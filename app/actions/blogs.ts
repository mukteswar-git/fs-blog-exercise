"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, increaseLike } from "../services/blogs"
import { auth } from "@/auth"
import { eq, and } from "drizzle-orm"
import { db } from "../../db"
import { users, readingList } from "../../db/schema"

type CreateBlogState = {
  error: string
  success?: boolean
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
      values: { title, author, url },
    }
  }

  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long",
      values: { title, author, url },
    }
  }

  if (!url || url.length < 5) {
    return {
      error: "URL must be at least 5 characters long",
      values: { title, author, url },
    }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")

  return {
    error: "",
    success: true,
    values: {
      title,
      author,
      url,
    },
  }
}

export const increaseBlogLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await increaseLike(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingList = async (formData: FormData) => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const blogId = Number(formData.get("id"))

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!user) {
    redirect("/login")
  }

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId),
    ),
  })

  if (existing) {
    return
  }

  console.log("ADDING TO READING LIST:", {
    userId: user.id,
    blogId,
  })

  await db.insert(readingList).values({
    userId: user.id,
    blogId,
  })

  console.log("READING LIST INSERTED")

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markAsRead = async (formData: FormData) => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const readingListId = Number(formData.get("id"))

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!user) {
    redirect("/login")
  }

  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(
        eq(readingList.id, readingListId),
        eq(readingList.userId, user.id),
      ),
    )

  revalidatePath("/me")
}
