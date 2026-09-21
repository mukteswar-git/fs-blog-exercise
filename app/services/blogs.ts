const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Smith",
    url: "https://example.com/getting-started-nextjs",
    likes: 5,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    author: "Sarah Johnson",
    url: "https://example.com/react-server-components",
    likes: 10,
  },
  {
    id: 3,
    title: "Building APIs with Next.js",
    author: "Michael Brown",
    url: "https://example.com/nextjs-apis",
    likes: 15,
  },
];

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({id: nextId++, title, author, url, likes: 0})
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const increaseLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);

  if (blog) {
    blog.likes += 1
  }
}
