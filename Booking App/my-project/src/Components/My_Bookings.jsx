import React, { useEffect, useState } from "react";
import axios from "axios";

const My_Bookings = () => {
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getbookings")
      .then((result) => {
        console.log(result.data);
        setbookings(result.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="max-w-[1440px] flex flex-col">
      {bookings.map((elem, id) => (
        <div className="flex flex-col sm:flex-row  gap-3 mt-3 bg-gray-100 items-center">
          <div className="w-52">
            <img
              src={"http://127.0.0.1:3000/uploads/" + elem.place.photos[0]}
            />
          </div>
          <div className="flex flex-col">
          <div className="flex gap-3">
            <h1>Check in time {new Date(elem.checkin).toLocaleString()}</h1>
            <h1>Check out time {new Date(elem.checkout).toLocaleString()}</h1>
          </div>
          <div>
            <h1>Total Price {elem.price}</h1>
          </div>
          <div>
            <h1>Total days {elem.days}</h1>
          </div>
          <div>
            <h1>No of Guests {elem.Noguests}</h1>
          </div>
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default My_Bookings;
