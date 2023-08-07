import { React, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Provider/userContextProvider";

const Login = () => {
  const { setuser } = useContext(UserContext);
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const [redirect, setredirect] = useState(false);
  const submit_login = async () => {
    if (pass !== "" && email !== "") {
      try {
        const get_res = await axios.post(
          "http://127.0.0.1:3000/Login",
          { email, pass },
         
        );
        alert("loged in");

        setuser(get_res.data);
        setredirect(true);
      } catch (e) {
        alert("login Failed");
      }
    } else {
      alert("Please fill all fields");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className=" py-32 ">
      <div className="flex flex-col gap-4 items-center mt-10">
        <div className="font-semibold text-2xl">
          <h1>Login</h1>
        </div>
        <div className="border border-gray-500 p-2 rounded-full">
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className=" rounded-full md:w-96 w-64 p-2"
            type="email"
            placeholder="your(email)@....com"
          />
        </div>
        <div className="border border-gray-500 p-2 rounded-full">
          <input
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            className=" rounded-full md:w-96 w-64 p-2"
            type="password"
            placeholder="password"
          />
        </div>
        <div
          className="border border-red-400 rounded-full bg-red-400 text-white p-2"
          onClick={submit_login}
        >
          <button className="rounded-full md:w-96 w-64">Login</button>
        </div>
        <div>
          <p>
            Dont have account!{" "}
            <span className="font-bold">
              <Link to={"/signup"}>Register</Link>
            </span>{" "}
            now
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
