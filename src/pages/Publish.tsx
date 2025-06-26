import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  interface LocationState {
    name: string;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
  const name = state?.name || "Guest";
  return (
    <div className="flex flex-col items-center">
      <Appbar name={name} />

      <div className="pt-10 text-2xl my-5">
        <textarea
          placeholder="Enter your title here..."
          className=" max-w-3xl min-w-3xl  p-2 border border-gray-300 rounded resize-y min-h-[100px]" onChange={(e)=>{setTitle(e.target.value)}}
        ></textarea>
      </div>

      <div className="text-xl">
        <textarea
          placeholder="Enter your message..."
          className=" max-w-3xl min-w-3xl  p-2 border border-gray-300 rounded resize-y min-h-[200px]" onChange={(e)=>{setContent(e.target.value)}}
        ></textarea>
      </div>

      <div className="max-w-3xl min-w-3xl pt-2">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 pb-1.5 px-3 rounded-full mx-2.5 cursor-pointer" onClick={async ()=>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{title:title, content:content} ,{headers:{authorization:`${localStorage.getItem("jwt")}`}});
            alert(response.data.msg);
            navigate(`/blog/${response.data.id}`)
        }}>
          Publish
        </button>
      </div>
    </div>
  );
};
