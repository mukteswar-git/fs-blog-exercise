"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

type RegisterState = {
  error: string
}

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 4) {
    return {
      error: "Username must be at least 4 characters long",
    }
  }

  if (!password || password.length < 4) {
    return {
      error: "Password must be at least 4 characters long",
    }
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
    }
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  if (existingUser.length > 0) {
    return {
      error: "Username is already taken",
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}
