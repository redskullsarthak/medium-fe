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
    return (
      <div className="flex flex-col items-center animate-pulse">
        <Appbar name={name_} />
        <div className="max-w-3xl min-w-3xl">
          {Array(3).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="p-5 border-b border-b-slate-300 m-4 cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="pl-2 flex flex-col gap-1">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

              <div className="pt-4 h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Appbar name={name_} />
      <div className="max-w-3xl min-w-3xl">
        {blogs.map((blog: Blog) => {
          return (
            <BlogCard
              key={blog.id}
              name={blog.author.name || "Avinash Pandey"}
              title={blog.title}
              content={blog.content}
              published={"23-10-2020"}
              id={blog.id}
              name_={name_}
            />
          );
        })}
      </div>
    </div>
  );
};
