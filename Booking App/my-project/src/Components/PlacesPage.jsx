import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsFillHouseAddFill } from "react-icons/bs";

import { Link, Navigate, useParams } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
const PlacesPage = () => {
  const [places, setplaces] = useState([]);
  const [selectededid, setseelctededitid] = useState("");
  const [checkredirect, setcheckredirect] = useState(false);
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/getplaces").then((get_d) => {
      console.log(get_d);
      setplaces(get_d.data);
    });
  }, []);

  const editinfo = (id) => {
    setseelctededitid(id);
    setcheckredirect(true);
  };

  if (checkredirect) {
    console.log("redirecting");
    return <Navigate to={"/account/places/form/" + selectededid} />;
  }

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center text-white">
        <Link to={"/account/places/form"}>
          <button className="flex bg-red-400 rounded-full px-5 py-2">
            {" "}
            <BsFillHouseAddFill className="mr-1" size={20} />
            Add New Place
          </button>
        </Link>
      </div>
      <div>
        {places.length > 0 ? (
          <div className="flex flex-col gap-2 mt-10 md:px-32  ">
            {places.map((elem) => (
              <div
                key={elem._id}
                className="flex justify-between bg-gray-50 mt-5"
              >
                <div className="flex flex-col sm:flex-row sm:gap-2  items-start sm:justify-start sm:items-start  px-2 w-full ">
                  <div className=" flex w-full sm:w-40 h-full items-center">
                    <img
                      className="w-full sm:w-40 h-40"
                      src={"http://127.0.0.1:3000/uploads/" + elem.photos[0]}
                    />
                  </div>
                  <div className=" w-full flex flex-col justify-around ">
                    <h1 className="sm:mt-6 font-bold max-full">{elem.title}</h1>
                    <p className="">{elem.description}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center p-10 ">
                  <AiTwotoneEdit
                    className="cursor-pointer"
                    onClick={(e) => editinfo(elem._id)}
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
