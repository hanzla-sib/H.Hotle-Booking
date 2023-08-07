import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Signup from "./Components/Signup";
import UserContextProvider from "./Provider/userContextProvider";
import axios from "axios";
import Account from "./Components/Account";
import Placeform from './Components/placeform';
import SeelctedPlace from "./Components/SeelctedPlace";
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account/:subpage?" element={<Account />} />
            <Route path="/account/:subpage/:action" element={<Account />} />
            <Route path="/account/:subpage/:action/:edit_id" element={<Account />} />
            <Route path="/places/:id" element={<SeelctedPlace />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}
