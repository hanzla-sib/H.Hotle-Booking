import React, { useEffect, useState } from "react";
import AddPhotoLink from "./AddPhotoLink";
import AddPhotobutton from "./AddPhotobutton";
import Perkspage from "./Perks";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
const Placeform = () => {
  const [title, settitle] = useState("");
  const [address, setaddress] = useState("");
  const [Photo, setPhoto] = useState([]);
  const [photolink, setphotolink] = useState("");
  const [description, setdescription] = useState("");
  const [Perks, setperks] = useState([]);
  const [extrainfo, setextrainfo] = useState("");
  const [checkin, setcheckin] = useState("");
  const [checkout, setcheckout] = useState("");
  const [maxguests, setmaxguests] = useState(1);
  const [checkredirect, setcheckredirect] = useState(false);
  const [price, setprice] = useState(100);

  const { edit_id } = useParams();
  console.log(edit_id);
  useEffect(() => {
    if (edit_id !== undefined) {
      axios
        .get("http://127.0.0.1:3000/getplacebyid/" + edit_id)
        .then((get_data) => {
          settitle(get_data.data.title);
          setaddress(get_data.data.address);
          setPhoto(get_data.data.photos);
          setdescription(get_data.data.description);
          setperks(get_data.data.perks);
          setextrainfo(get_data.data.extrainfo);
          setcheckin(get_data.data.checkIn);
          setcheckout(get_data.data.checkout);
          setmaxguests(get_data.data.MaxGuests);
          setprice(get_data.data.price);
        });
    }
  }, []);

  const addnewplace = async (e) => {
    e.preventDefault();

    if (edit_id !== undefined) {
      const setplace = await axios.post(
        "http://127.0.0.1:3000/setplace_updated",
        {
          title,
          address,
          Photo,
          description,
          Perks,
          extrainfo,
          checkin,
          checkout,
          maxguests,
          edit_id,
          price,
        }
      );
      console.log("data_updated");
      setcheckredirect(true);
    } else {
      const setplace = await axios.post("http://127.0.0.1:3000/setplace", {
        title,
        address,
        Photo,
        description,
        Perks,
        extrainfo,
        checkin,
        checkout,
        maxguests,
        price,
      });
      console.log(setplace.data);
      setcheckredirect(true);
    }
  };

  if (checkredirect) {
    return <Navigate to={"/account/places"} />;
  }

  const upload_by_link = async (ev) => {
    ev.preventDefault();
    if (photolink === "") {
      alert("Give me the Link");
    } else {
      const post_link = await axios.post("http://127.0.0.1:3000/uploadbylink", {
        link: photolink,
      });
      setPhoto((prev) => {
        return [...prev, post_link.data];
      });
      setphotolink("");
    }
  };

  const upload_by_button = (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    // console.log(data);
    axios
      .post("http://127.0.0.1:3000/upload_by_button", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        // const { data } = response;
        console.log(response.data);

        // console.log(data);
        setPhoto((prev) => {
          return [...prev, ...response.data];
        });
      });
  };

  return (
    <div className="max-w-[1440] flex justify-center">
      <form className="shadow-lg p-10" onSubmit={addnewplace}>
        <h2 className="font-bold text-lg">Title</h2>
        <p className="text-gray-400 text-sm mt-2">
          Title of apt should be small and catchy
        </p>
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full md:w-[600px] mt-1 bg-transparent border-2  rounded-2xl px-2"
          type="text"
          placeholder="title e.g my lovely apt"
        />
        <h2 className="font-bold text-lg mt-2">Address</h2>
        <p className="text-gray-400 text-sm mt-2">Address to your place</p>
        <input
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="w-full md:w-[600px] mt-1 bg-transparent border-2  rounded-2xl px-2"
          type="text"
          placeholder="Address"
        />
        <h2 className="font-bold text-lg mt-2">Photos</h2>
        <p className="text-gray-400 text-sm mt-2">more = better</p>

        <AddPhotoLink
          photolink={photolink}
          setphotolink={setphotolink}
          upload_by_link={upload_by_link}
        />

        <AddPhotobutton
          Photo={Photo}
          upload_by_button={upload_by_button}
          setPhoto={setPhoto}
        />

        <label>
          <h2 className="font-bold text-lg mt-2">Description</h2>
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full md:w-[600px] mt-1 bg-transparent border-2  rounded-2xl px-2 py-10"
            type="text"
            placeholder="Description"
          />
        </label>
        <div>
          <Perkspage Perks={Perks} setperks={setperks} />

          <label>
            <h2 className="font-bold text-lg mt-4">Extra Info</h2>
            <p className="text-gray-400 text-sm mt-2">House Rules etc..</p>
            <input
              value={extrainfo}
              onChange={(e) => setextrainfo(e.target.value)}
              className="w-full md:w-[600px] mt-1 bg-transparent border-2  rounded-2xl px-2 py-10"
              type="text"
              placeholder="Description"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 ">
            <label className="flex flex-col justify-center">
              <p className="text-left font-semibold">Check out time</p>
              <input
                value={checkout}
                onChange={(e) => setcheckout(e.target.value)}
                className="px-10 py-2 bg-transparent border-2  rounded-2xl "
                type="text"
                placeholder="14:00"
              />
            </label>
            <label className="flex flex-col justify-center">
              <p className="text-left font-semibold">Check out time</p>
              <input
                value={checkin}
                onChange={(e) => setcheckin(e.target.value)}
                className="px-10 py-2 bg-transparent border-2  rounded-2xl "
                type="text"
                placeholder="14:00"
              />
            </label>
            <label className="flex flex-col justify-center">
              <p className="text-left font-semibold">Max Guests</p>
              <input
                value={maxguests}
                onChange={(e) => setmaxguests(e.target.value)}
                className="px-10 py-2 bg-transparent border-2  rounded-2xl "
                type="text"
                placeholder="1"
              />
            </label>
            <label className="flex flex-col justify-center">
              <p className="text-left font-semibold">Price Per Night</p>
              <input
                value={price}
                onChange={(e) => setprice(e.target.value)}
                className="px-10 py-2 bg-transparent border-2  rounded-2xl "
                type="text"
                placeholder="1"
              />
            </label>
          </div>
          <div className="bg-red-400 rounded-full p-3 mt-4 text-white">
            <button className="w-full">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeform;
