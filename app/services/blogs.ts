import { eq, sql, ilike, desc } from "drizzle-orm"
import { db } from "../../db";
import { blogs } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: filter
        ? ilike(blogs.title, `%${filter}`)
        : undefined,
      orderBy: desc(blogs.likes),
    })
  }

  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  
  await db.insert(blogs).values({ title, author, url, userId: user.id })
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const increaseLike =  async (id: number) => {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`
    })
    .where(eq(blogs.id, id))
}
