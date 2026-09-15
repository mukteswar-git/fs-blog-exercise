const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Smith",
    url: "https://example.com/getting-started-nextjs",
    likes: 0,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    author: "Sarah Johnson",
    url: "https://example.com/react-server-components",
    likes: 0,
  },
  {
    id: 3,
    title: "Building APIs with Next.js",
    author: "Michael Brown",
    url: "https://example.com/nextjs-apis",
    likes: 0,
  },
];

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({id: nextId++, title, author, url, likes: 0})
}
