import { Link } from "react-router-dom";

interface BlogCard_interface {
  title: string;
  content: string;
  name: string;
  published: string;
  id:string
  name_:string
}

export const BlogCard = ({
  title,
  content,
  name,
  published,
  id,
  name_
}: BlogCard_interface) => {

  return (
    <Link to={`/blog/${id}`} state={{name:name_}}>
      <div className="p-5 border-b border-b-slate-300 m-4 cursor-pointer">
        <div className="flex items-center">
          <Avatar name={name} />
          <div className="pl-2 flex items-center text-slate-900">
            {name}
            <span className="pl-4 text-slate-600">{published}</span>
          </div>
        </div>

        <div className="font-bold text-2xl">{title}</div>
        <div className="font-light">
          {content.length > 100 ? content.slice(0, 100) + "....." : content}
        </div>
        <div className="pt-4 text-slate-600">
          {Math.ceil(content.length / 100)} minutes read
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div>
      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {name[0]}
        </span>
      </div>
    </div>
  );
}
