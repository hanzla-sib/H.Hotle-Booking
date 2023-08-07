import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [allplaces, setallplaces] = useState([]);
  const [id,setid]=useState("");
  const [redirect,setredirect]=useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getallplaces")
      .then((res) => {
        setallplaces(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  const movetopage=(id)=>{
    setid(id);
    setredirect(true);
  }

  if(redirect){
    return <Navigate to={"/places/"+id}/>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-2xl gap-7 mt-4 p-10 lg:p-14">
      {allplaces.map((elem, id) => (
        <div key={id} className="flex flex-col gap-1 p-2 cursor-pointer" onClick={(e)=>movetopage(elem._id)}>
          <div className="w-50 h-56 rounded-lg">
            <img
              className="w-full h-full rounded-lg"
              src={"http://127.0.0.1:3000/uploads/" + elem.photos[0]}
            />
          </div>
          <div className="flex flex-col">
          <div className="truncate text-sm text-gray-500">{elem.description}</div>
          <div className=" font-bold  truncate">{elem.address}</div>
     
      <div className="font-semibold"><span className="font-bold">${elem.price}</span> Per Night</div>
          </div>
       
        </div>
      ))}
    </div>
  );
};

export default Home;
