import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { useLocation } from "react-router-dom";

interface LocationState {
  name: string;
}
export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  const location = useLocation();
const state = location.state as LocationState | undefined;
  const name_ = state?.name || "Anonymous";

  interface Blog {
    title: string;
    content: string;
    id: string;
    author: { name: string };
  }
  if (loading) {
    return <div>loading....</div>;
  } else
    return (
      <div className="flex flex-col items-center">
        <Appbar name={name_} />
        <div className="max-w-3xl min-w-3xl">
          {blogs.map((blog: Blog) => {
            return (
              <BlogCard
                name={blog.author.name || "Avinash Pandey"}
                title={blog.title}
                content={blog.content}
                published={"23-10-2020"}
                id={blog.id}
                name_ ={ name_}
              />
            );
          })}
        </div>
      </div>
    );
};
