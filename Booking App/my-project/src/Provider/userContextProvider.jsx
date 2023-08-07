import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [ready, setready] = useState(false);
  useEffect(() => {
    if (!user) {
      async function fetchData() {
        try {
          const response = await axios.get("http://127.0.0.1:3000/Profile");

          setuser(response.data);
          setready(true);
        } catch (error) {
          setready(true);
          console.log("Error fetching user data:");
        }
      }

      fetchData();
    }
  }, [user]); // Include 'user' in the dependency array
  return (
    <UserContext.Provider value={{ user, setuser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
