import { Quote } from "../components/Quote";
import { Auth } from '../components/Auth'

export const Signup = () => {
  return (
    <>
      <div className="h-screen flex">
        <Auth type = {"signup"}/>

       <Quote/>
      </div>
    </>
  );
};
