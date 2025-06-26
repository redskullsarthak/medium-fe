import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  console.log(localStorage.getItem("jwt"));
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { authorization: `${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        const items = response.data?.posts || []; // fallback to [] if undefined
        console.log(items); // should now log your array
        setBlogs(items);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};

interface Blog{
  title:string,content:string,id:string,author:{name:string}
}

export const useBlog = (id:string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  console.log(localStorage.getItem("jwt"));
  console.log(`${BACKEND_URL}/api/v1/blog/${id}`)
  console.log(id);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { authorization: `${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        console.log(response)
        const items = response.data?.post || [];
        console.log(items); 
        setBlog(items);
        setLoading(false);
      });
  }, [id]);
  return { loading, blog };
};
