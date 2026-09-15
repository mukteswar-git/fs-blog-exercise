import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div className="blog-page">
      <h2>Create a new blog</h2>

      <form className="blog-form" action={createBlog}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" required />
        </div>

        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input id="author" type="text" name="author" required />
        </div>

        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input id="url" type="url" name="url" required />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
