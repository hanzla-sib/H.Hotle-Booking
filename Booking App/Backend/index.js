const express = require("express");
const User = require("./Models/User");
const Bookings = require("./Models/Booking");
const Place = require("./Models/Place");
const cors = require("cors"); //for multi side data transfer
const jwt = require("jsonwebtoken"); //jsonwebtoken
const cookieparser = require("cookie-parser");
const app = express();
const jwtsecret = "dasdasdasdasdasdasdasdasdasdasfsd";
const fs = require("fs"); // for renaming the file
const image_downloader = require("image-downloader"); //downlaod image from link or url npm install image-downlaoder
require("dotenv").config(); // to config the url of mongoose
const mongoose = require("mongoose");
const multer = require("multer"); // for image to downlaod from pc to storage
const bodyParser = require("body-parser"); // Import body-parser
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use("/uploads", express.static(__dirname + "/Uploads"));
app.use(cookieparser());
// cookie-parser: cookie-parser is a
// middleware used to parse HTTP request
// cookies in Node.js/Express applications.
// It extracts cookie data from the incoming request's headers, parses it, and makes
//  it accessible in the req.cookies object. This allows you to easily read and work with cookies in your application.
app.use(bodyParser.json());
/*It allows you to extract the data sent in the
 request body, which is typically in JSON format, and makes it available in the 
req.body object. This is especially useful
 when dealing with POST requests or PUT requests that send JSON data. */
console.log(process.env.Mongo_url);
mongoose.connect(process.env.Mongo_url);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//VEzRLhmiKVRUZTVC

app.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const usedoc = await User.create({
      name,
      email,
      password,
    });
    res.json(usedoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/Login", async (req, res) => {
  const { email, pass } = req.body;
  const userdoc = await User.findOne({ email });
  try {
    if (userdoc) {
      if (pass === userdoc.password) {
        jwt.sign(
          { email: userdoc.email, id: userdoc._id },
          jwtsecret,
          {},
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.cookie("token", token).json(userdoc);
              console.log(token);
            }
          }
        );
      } else {
        res.json("password not matched");
      }
    } else {
      res.json("email not found");
    }
  } catch (err) {
    res.json(err);
  }
});

app.get("/Profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, user) => {
      try {
        if (!user) {
          // Handle the case where the user is undefined (token expired or invalid)
          return res.status(401).json({ error: "Invalid or expired token" });
        }
        const userdata = await User.findById(user.id);

        if (!userdata) {
          // Handle the case where the user document is not found in the database
          return res.status(404).json({ error: "User not found" });
        }

        res.json(userdata);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.status(401).send("No token");
  }
});

app.post("/Logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

console.log({ __dirname });

app.post("/uploadbylink", async (req, res) => {
  const { link } = req.body;
  const newname = "photo" + Date.now() + ".jpg";
  const downloaded = await image_downloader.image({
    url: link,
    dest: __dirname + "/Uploads/" + newname,
  });
  if (downloaded) {
    res.json(newname);
  }
});

const middleware = multer({ dest: "Uploads/" });

app.post("/upload_by_button", middleware.array("photos", 100), (req, res) => {
  const uplaod_files = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;

    fs.renameSync(path, newpath);
    uplaod_files.push(newpath.replace("Uploads\\", ""));
  }
  console.log(uplaod_files);
  res.json(uplaod_files);
});

app.post("/setplace", (req, res) => {
  const { token } = req.cookies;
  const {
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
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, userdata) => {
    if (err) {
      throw err;
    } else {
      console.log(req.body);
      const data_upload = await Place.create({
        owner: userdata.id,
        title,
        address,
        photos: Photo,
        description,
        perks: Perks,
        extrainfo,
        checkIn: checkin,
        checkout,
        MaxGuests: maxguests,
        price,
      });
      // if (data_upload) {
      res.json("data uploaded succesfully");
      // }
    }
  });
});

app.post("/setplace_updated", (req, res) => {
  const { token } = req.cookies;
  const {
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
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, userdata) => {
    if (err) {
      throw err;
    } else {
      const place_doc = await Place.findById(edit_id);

      if (place_doc) {
        console.log(place_doc);
        place_doc.set({
          owner: userdata.id,
          title,
          address,
          photos: Photo,
          description,
          perks: Perks,
          extrainfo,
          checkIn: checkin,
          checkout,
          MaxGuests: maxguests,
          price,
        });
        place_doc.save();
        res.json("data updated succesfully");
      }
    }
  });
});

app.get("/getplaces", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userdata) => {
    if (err) {
      throw err;
    } else {
      const { id } = userdata;
      res.json(await Place.find({ owner: id }));
    }
  });
});

app.get("/getplacebyid/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  console.log(place);
  res.json(place);
});

app.get("/getallplaces", async (req, res) => {
  const allplaces = await Place.find({});
  console.log(allplaces);
  res.json(allplaces);
});

app.post("/postbookings", (req, res) => {
  const {
    checkin,
    checkout,
    phoneno,
    name,
    numberofguests,
    noofdays,
    price,
    id,
  } = req.body;

  const { token } = req.cookies;

  jwt.verify(token, jwtsecret, {}, async (err, userdata) => {
    if (err) {
      throw err;
    } else {
      if (userdata) {
        const user_id = userdata.id;
        const post_bookings = await Bookings.create({
          place: id,
          checkin,
          checkout,
          name,
          phone: phoneno,
          price,
          days: noofdays,
          Noguests: numberofguests,
          user: user_id,
        });
        res.json(post_bookings);
      }
    }
  });
});

app.get("/getbookings", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userdata) => {
    if (err) {
      throw err;
    } else {
      if (userdata) {
        const { id } = userdata;
        const get_results = await Bookings.find({ user: id }).populate("place");
        console.log(get_results);

        res.json(get_results);
      }
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
