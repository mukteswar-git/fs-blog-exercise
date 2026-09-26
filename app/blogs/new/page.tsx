"use client"

import { useActionState } from "react";
import { createBlog } from "@/actions/blogs"

const NewBlog = () => {
  const [state, formAction] = useActionState(
    createBlog, 
    { 
      error: "", 
      values: {
        title: "",
        author: "",
        url: "",
      },
    }
  )

  return (
    <div className="blog-page">
      <h2 className="mt-4">Create a new blog</h2>

      <form className="blog-form" action={formAction}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type="text" 
            name="title" 
            required 
            minLength={5}
            defaultValue={state.values?.title}
          />
        </div>

        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input 
            id="author" 
            type="text" 
            name="author" 
            required 
            minLength={5}
            defaultValue={state.values?.author}
          />
        </div>

        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input 
            id="url" 
            type="url" 
            name="url" 
            required 
            minLength={5}
            defaultValue={state.values?.url}
          />
        </div>

        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Create
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewBlog;
