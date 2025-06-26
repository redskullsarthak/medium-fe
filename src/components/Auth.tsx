import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@avinash13/medium2-common";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputs, setpostInputs] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });

   const navigate = useNavigate();
  async function make_request() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,{
            name:postInputs.name, email:postInputs.email, password:postInputs.password
        }
      );

      if(response.data.jwt){
        localStorage.setItem("jwt",'Bearer '+response.data.jwt);
        (type=='signin')? alert("successfully signed in") : alert("successfully signed up");
        navigate('/blogs', {state : {name : postInputs.name}})
        
      }else{
        alert(response.data.msg);
      }
    } catch {
        alert(`error while signing ${(type=='signin')? "in" : "up"}`)
    }
  }

  return (
    <div className="w-full sm:w-1/2 bg-white  flex items-center justify-center">
      <div className="bg-gray-100 p-10 pb-15  pt-12 rounded-2xl shadow-2xl border-slate-200 border-2">
        <div className="text-center">
          <div className="font-extrabold text-3xl pl-5 pr-5">
            {type == "signup" ? "Create an account" : "Welcome back!"}
          </div>
          <div>
            {type == "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <Link
              to={type == "signup" ? "/signin" : "/signup"}
              className="pl-1 cursor-pointer underline"
            >
              {type == "signup" ? "Login" : "Sign up"}
            </Link>
          </div>
        </div>

        {type == "signup" ? (
          <LabledInput
            label={"Username"}
            placeholder={"Enter your username"}
            onChange={(e) => {
              setpostInputs({ ...postInputs, name: e.target.value });
            }}
          />
        ) : (
          ""
        )}

        <LabledInput
          label={"Email"}
          placeholder={"Enter your email"}
          onChange={(e) => {
            setpostInputs({ ...postInputs, email: e.target.value });
          }}
        />

        <LabledInput
          label={"Password"}
          placeholder={"Enter your password"}
          type={"password"}
          onChange={(e) => {
            setpostInputs({ ...postInputs, password: e.target.value });
          }}
        />

        <div className="pt-10">
          <button onClick={make_request} className="bg-gray-800 text-2xl text-gray-100 font-bold w-full rounded-2xl p-1 cursor-pointer">
            {type == "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabledInput({ label, placeholder, onChange, type }: LabledInputType) {
  return (
    <div className="pt-5">
      <div className="font-bold pb-2">{label}</div>
      <input
        className="border-gray-300 border-2 w-full p-1 rounded"
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
      />
    </div>
  );
}
