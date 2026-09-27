import Link from "next/link"

const Home = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Blogs App
        </h2>

        <p className="mb-4 text-gray-600">
          An example app for{" "}
          <a
            href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Full Stack Open Next.js
          </a>
        </p>

        <p className="text-gray-600">
          See{" "}
          <a
            href="https://github.com/mukteswar-git/fs-blog-exercise"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            the source code on GitHub
          </a>
          .
        </p>
      </div>
    </main>
  )
}

export default Home
