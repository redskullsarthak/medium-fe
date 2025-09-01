import { Quote } from "../components/Quote";
import { Auth } from '../components/Auth'

export const Signin = () => {
  return (
    <>
      <div className="h-screen flex">
        <Auth type = {"signin"}/>

       <Quote/>
      </div>
    </>
  );
};