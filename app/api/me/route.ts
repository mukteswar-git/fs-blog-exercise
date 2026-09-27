import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "../../../db"
import { users } from "../../../db/schema"

export const GET = async (request: Request) => {
  const authorization = request.headers.get("Authorization")

  if (!authorization) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  const [scheme, token] = authorization.split(" ")

  if (scheme !== "Bearer" || !token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: true,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    )
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs,
  })
}
