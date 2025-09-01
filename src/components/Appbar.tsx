import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
interface name {
  name: string;
}
export const Appbar = (name: name) => {
  return (
    <div className="flex justify-between w-full px-5 py-2 shadow-2xl">
      <Link to="/blogs">
        <div className="font-bold text-slate-700 text-2xl cursor-pointer">
          Medium
        </div>
      </Link>
      <div className="flex items-center">
        <Link to='/publish' state={{name:name.name}}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 pb-1.5 px-3 rounded-full mx-2.5 cursor-pointer">
            new
          </button>
        </Link>

        <Avatar name={name.name} />
      </div>
    </div>
  );
};
