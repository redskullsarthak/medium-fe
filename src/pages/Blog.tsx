import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useLocation } from "react-router-dom";

interface LocationState {
  name: string;
}
export const Blog = () => {
  const { id } = useParams();
  console.log("Blog " + id)
  if (!id) return <div>error</div>;

  const { loading, blog } = useBlog(id);
  console.log(blog)
  

  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const name = state?.name || "Avinash";

  if (loading) return <div>
    <Appbar name={name}/>
    <div className="flex w-full items-center h-full">loading ... </div>
  </div>;
  if(!blog)return <div></div>
  return (
    <div>
      <Appbar name={name}/>
      <div className="grid grid-cols-12 p-15">
        <div className="col-span-8">
          <div className="font-extrabold text-4xl">{blog.title}</div>
          <div className="mt-1 text-slate-500">12 December, 2024</div>
          <div className="mt-2">
            {blog.content}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 mt-5">
          <div className="text-slate-600 font-medium">Author</div>
          <div className="text-2xl font-bold ml-5">{blog.author.name || 'Anonymous'}</div>
          <div className="ml-5 text-slate-700">
            jdflkasj sjfsjwoeiuwo wrwoi sfldsj salkf sflksajfljdflkasj
            sjfsjwoeiuwo
          </div>
        </div>
      </div>
    </div>
  );
};
