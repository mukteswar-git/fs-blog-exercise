import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs";
import { increaseBlogLike } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p><i>by <b>{blog.author}</b></i> - {blog.likes} likes</p>
      <p>Link: <a href={blog.url}>{blog.url}</a></p>
      <form action={increaseBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
