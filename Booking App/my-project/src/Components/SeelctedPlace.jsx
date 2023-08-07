import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { BiSolidPhotoAlbum, BiLocationPlus } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { differenceInCalendarDays } from "date-fns";
// import { FaLocationDot } from "react-icons/fa";
const SeelctedPlace = () => {
  const [openwindows, setwindows] = useState(false);
  const { id } = useParams();
  const [place, setplaces] = useState([]);
  const [checkin, setcheckin] = useState("");
  const [checkout, setcheckout] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [name, setname] = useState("");
  const [numberofguests, setnumberofguests] = useState(1);
  let noofdays = 0;
  const [redirect, setredirect] = useState(false);
  const submit = async () => {

    if(checkin!==""&&checkout!==""&&phoneno!==""&&name!==""){
      var data_sub = {
        checkin,
        checkout,
        phoneno,
        name,
        numberofguests,
        noofdays,
        price: place.price * noofdays,
        id,
      };
  
      const data_send = await axios.post(
        "http://127.0.0.1:3000/postbookings",
        data_sub
      );
      if(data_send){
        setredirect(true);
      }
    }
    else{
      alert('Please fill all the fields');
    }
    
  };

  if (checkin && checkout) {
    noofdays = differenceInCalendarDays(new Date(checkout), new Date(checkin));
  }

  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getplacebyid/" + id)
      .then((res) => {
        setplaces(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  if(redirect){
    return <><Navigate to={"/account/bookings"}/></>
  }

  if (openwindows) {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mt-4">All Photos</h1>
          <ImExit
            className="mt-4 cursor-pointer"
            onClick={(e) => setwindows(false)}
            size={30}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2  max-w-[1640px] mt-4">
            {place.photos.map((elem, id) => (
              <div className="h-96 max-w-full">
                <img
                  className="h-full w-full object-cover  "
                  src={"http://127.0.0.1:3000/uploads/" + place.photos[id]}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="max-w-[1440px] mt-20 sm:p-4 shadow-md">
        <div className="flex flex-col bg-gray-50">
          <div className="flex flex-col sm:px-4 mt-3">
            <div className="font-bold text-lg">{place.title}</div>
            {/* <FaLocationDot size={30} />  */}
            <div className="underline text-sm font-semibold flex items-center">
              <BiLocationPlus size={18} /> {place.address}
            </div>
          </div>
          {place.photos && (
            <div className="grid sm:grid-cols-[2fr_1fr] gap-2 max-w-full mt-6 sm:p-4  ">
              <div className="h-[607px] border-1 border-black sm:rounded-l-3xl sm:rounded-none rounded-2xl">
                <img
                  className="h-full w-full object-cover sm:rounded-l-3xl sm:rounded-none rounded-2xl"
                  src={"http://127.0.0.1:3000/uploads/" + place.photos[0]}
                />
              </div>

              <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-1 gap-2 ">
                <div className="h-[300px] border-1 border-black sm:rounded-r-3xl sm:rounded-none rounded-2xl">
                  <img
                    className="h-full w-full object-cover sm:rounded-r-3xl sm:rounded-none rounded-2xl"
                    src={"http://127.0.0.1:3000/uploads/" + place.photos[1]}
                  />
                </div>
                <div className="h-[300px] w-full border-1 border-black relative sm:rounded-none sm:rounded-r-3xl rounded-2xl">
                  <img
                    className="h-full w-full object-cover sm:rounded-r-3xl sm:rounded-none rounded-2xl"
                    src={"http://127.0.0.1:3000/uploads/" + place.photos[2]}
                  />
                  <p
                    className="absolute bottom-0 right-0 flex items-center text-white cursor-pointer bg-black rounded-full p-2 mb-2"
                    onClick={(e) => setwindows(true)}
                  >
                    {" "}
                    Show all photos{" "}
                    <BiSolidPhotoAlbum
                      className="ml-2"
                      onClick={(e) => setwindows(true)}
                      size={20}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-[2fr_1fr]">
            <div className="sm:px-4 px-2 mt-3">
              <span className="font-semibold text-xl">Description </span>
              <br></br>
              {place.description}
              <br></br>
              <span className="font-semibold text-xl">CheckIn </span>
              <br></br>
              {place.checkIn}
              <br></br>
              <span className="font-semibold text-xl">CheckOut </span>
              <br></br>
              {place.checkout}
              <br></br>
              <span className="font-semibold text-xl">Max No of Guests </span>
              <br></br>
              {place.MaxGuests}
              <br></br>
            </div>
            <div className="border-t sm:border-t-0 mt-5 sm:mt-0 border-black">
              <div className="flex flex-col items-center gap-2 justify-center shadow-xl p-4 mt-2">
                <div className="font-bold">
                  Price ${place.price} / Per night
                </div>
                {checkin && checkout && (
                  <div className="font-bold">
                    Days = {noofdays} Total = ${place.price * noofdays}
                  </div>
                )}
              </div>
              <div className="p-4 shadow-xl border-2 mt-4 flex">
                <div>
                  <label>Check Out </label>
                  <input
                    value={checkin}
                    onChange={(e) => setcheckin(e.target.value)}
                    type="date"
                    className="bg-[#F3F4F6] border-transparent focus:outline-none"
                  />
                </div>
                <div>
                  <label>Check Out </label>
                  <input
                    value={checkout}
                    onChange={(e) => setcheckout(e.target.value)}
                    type="date"
                    className="bg-[#F3F4F6] border-transparent focus:outline-none"
                  />
                </div>
              </div>
              <div className="p-4 shadow-xl border-2 mt-4 ">
                <div className="mb-2">No of Guests</div>
                <input
                  value={numberofguests}
                  type="text"
                  onChange={(e) => setnumberofguests(e.target.value)}
                  placeholder="Max no of Guests "
                  className="border-transparent focus:outline-none w-full"
                />
              </div>
              <div className="p-4 shadow-xl border-2 mt-4 ">
                <div className="mb-2">Full Name</div>
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Hanzla Sibghat"
                  className="border-transparent focus:outline-none w-full"
                />
              </div>
              <div className="p-4 shadow-xl border-2 mt-4 ">
                <div className="mb-2">Phone Number</div>
                <input
                  value={phoneno}
                  type="text"
                  onChange={(e) => setphoneno(e.target.value)}
                  placeholder="03334578907"
                  className="border-transparent focus:outline-none w-full"
                />
              </div>

              <div
                className="bg-red-400 text-white p-3 text-center mt-4 mb-4 cursor-pointer rounded-3xl"
                onClick={(e) => submit()}
              >
                <button className="">Book Now</button>
              </div>
            </div>
            <div className="p-3 bg-white">
              <span className="font-semibold text-xl">Extra Info </span>
              <div className="text-gray-600">{place.extrainfo}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SeelctedPlace;
