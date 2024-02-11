const express = require("express");
const index = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const JWT_SECRET = "asdfghjnbvcxsrtyuiopppjhgcxm/poiuytrewqasdfghjlmnbvcx/poiuytrewqafghjklmnbvcxz";
const mongoUrl = "mongodb+srv://voxite:voxite@cluster0.zmpxztq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("Connect to database");}).catch((e) => console.log("Error", e));

require("./models/UserDetails")
require("./models/BookingDetails")

const User = mongoose.model("UserInfo");
const Booking = mongoose.model("BookingInfo");

index.use(express.json());
index.use(cors())
index.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
index.use(cookieParser());
index.use(express.json({ limit: '10mb' }));
index.use(express.urlencoded({ extended: true, limit: '10mb' }));

index.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

const path = require('path');

index.post("/signup", async (req, res) => {
  const { name, email, phone, country, city, password, cpassword } = req.body;
  console.log(req.body);
  const encryptedPassword = await bcrypt.hash(password
    , 10);
  try {
      const oldUser = await User.findOne({email});
      if (oldUser) {
        return res.send({error: "User Already Exists"});
      }
      await User.create({
          name,
          email,
          phone,
          country,
          city,
          password: encryptedPassword,
          cpassword: encryptedPassword, 
      });
      res.send({ status: "ok" });
  } catch (error) {
      res.send({ status: "error" });
  } 
});

index.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' }); // 7 days, for example
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
   
    res.json({ token, username: user.name, userphone: user.phone, usercountry: user.country, usercity: user.city });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

index.get('/checkLoginStatus', async (req, res) => {
  console.log("Checking login status"+req+" "+req.cookies.token);
  try {
    if (req.cookies.token) {
      const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await User.findById(userId);
      console.log("Hi "+user);
      if (user) {

        res.json({ loggedIn: true, username: user.name , email: user.email});
      } else {
        res.json({ loggedIn: true, username: "voxite" });
      }
    } else {
      res.json({ loggedIn: false, username: "" });
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    res.status(500).json({ loggedIn: false, username: "" });
  }
});

index.post("/userdata", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    User.findById(userId).then((data) => {
      if (data) {
        res.send({ status: "ok", data: data });
      } else {
        res.status(404).send({ status: "error", message: "User not found" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: "Something went wrong" });
  }
})

index.get('/logout', (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();
})

index.post('/bookings', async (req, res) => {
  const { tourName, location, duration, numberOfPersons, fees } = req.body;
  try {
    const booking = await Booking.create({
      tourName,
      location,
      duration,
      numberOfPersons,
      fees
    });

    res.send({ status: "ok"}); // Return the token along with the response
  } catch (error) {
    res.send({ status: "error" });
  }
});


const port = process.env.PORT || 3001;
index.listen(port, () => {
  console.log(`Server started on port ${port}`);
});