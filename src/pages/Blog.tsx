
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useLocation } from "react-router-dom";

interface LocationState {
  name: string;
}

export const Blog = () => {
  const { id } = useParams();
  if (!id) return <div>error</div>;

  const { loading, blog } = useBlog(id);

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const name = state?.name || "Avinash";

  if (loading)
    return (
      <div>
        <Appbar name={name} />
        <div className="grid grid-cols-12 p-15 animate-pulse mt-4">
          <div className="col-span-8 px-4">
            <div className="h-10 bg-gray-200 w-3/4 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 w-1/4 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
              <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-3 mt-5 px-4">
            <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-2 ml-5"></div>
            <div className="space-y-2 ml-5">
              <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!blog) return <div></div>;

  return (
    <div>
      <Appbar name={name} />
      <div className="grid grid-cols-12 p-15">
        <div className="col-span-8">
          <div className="font-extrabold text-4xl">{blog.title}</div>
          <div className="mt-1 text-slate-500">12 December, 2024</div>
          <div className="mt-2">{blog.content}</div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 mt-5">
          <div className="text-slate-600 font-medium">Author</div>
          <div className="text-2xl font-bold ml-5">
            {blog.author.name || "Anonymous"}
          </div>
          <div className="ml-5 text-slate-700">
            jdflkasj sjfsjwoeiuwo wrwoi sfldsj salkf sflksajfljdflkasj sjfsjwoeiuwo
          </div>
        </div>
      </div>
    </div>
  );
};
