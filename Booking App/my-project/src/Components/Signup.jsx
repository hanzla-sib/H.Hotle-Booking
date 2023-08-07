import { React, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const submit = async () => {
    if (name !== "" && email !== "" && pass != "") {
      try {
        const geting = await axios.post("http://127.0.0.1:3000/Register", {
          name: name,
          email: email,
          password: pass,
        });

        alert("USer is registered succesfully now you can login");
      } catch (e) {
        alert("Registration failed try again later");
      }
    } else {
      alert("please complete the details");
    }
  };
  return (
    <div className=" py-32 ">
      <div className="flex flex-col gap-4 items-center mt-10">
        <div className="font-semibold text-2xl">
          <h1>Sign Up</h1>
        </div>
        <div className="border border-gray-500 p-2 rounded-full">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            className=" rounded-full md:w-96 w-64 p-2"
            type="text"
            placeholder="Name"
          />
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
          onClick={submit}
        >
          <button className="rounded-full md:w-96 w-64">Sign Up</button>
        </div>
        <div>
          <p>
            Already Member!{" "}
            <span className="font-bold">
              <Link to={"/Login"}>Login</Link>
            </span>{" "}
            now
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
