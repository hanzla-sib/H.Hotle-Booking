import { useContext, useState } from "react";
import { UserContext } from "../Provider/userContextProvider";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import Placeform from "./placeform";
import My_Bookings from "./My_Bookings";
const Account = () => {
  const { setuser, user, ready } = useContext(UserContext);
  const [redirect, setredirect] = useState(false);

  if (ready && !user) {
    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  }
  let { subpage, action, edit_id } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (edit_id === undefined) {
    edit_id = "";
  }

  const CheckLink = (type = null) => {
    let classes = "px-6 mr-3 rounded-full p-2";

    if (type === subpage) {
      classes += " bg-red-400 text-white";
    }
    return classes;
  };

  const Logout = async () => {
    let log_o = await axios.post("http://127.0.0.1:3000/Logout");
    if (log_o) {
      setuser(null);
      setredirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-10 w-full">
      <nav className="flex items-center justify-center md:gap-4 text-center p-5">
        <Link className={CheckLink("profile")} to={"/account/profile"}>
          My Profile
        </Link>
        <Link className={CheckLink("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={CheckLink("places")} to={"/account/places"}>
          My Accomodations
        </Link>
      </nav>
      {subpage === "profile" ? (
        <div className="flex flex-col space-y-4 items-center justify-center mt-10">
          <div>
            {user && (
              <>
                <div>
                  <h5>
                    Logged in as {user.name} ({user.email})
                  </h5>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              onClick={Logout}
              className="px-44 py-2 bg-red-400 text-white rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {subpage === "places" && action !== "form" ? <PlacesPage /> : ""}
      {subpage === "places" && action === "form" && edit_id === "" ? (
        <Placeform />
      ) : (
        ""
      )}
      {subpage === "places" && action === "form" && edit_id !== "" ? (
        <Placeform />
      ) : (
        ""
      )}
      {subpage === "bookings" && <My_Bookings />}
    </div>
  );
};

export default Account;
