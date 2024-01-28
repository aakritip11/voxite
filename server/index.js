const express = require("express");
const index = express();
index.use(express.json());
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
index.use(cors({origin: ["http://localhost:3000"]}));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const JWT_SECRET = "asdfghjnbvcxsrtyuiopppjhgcxm/poiuytrewqasdfghjlmnbvcx/poiuytrewqafghjklmnbvcxz";
const mongoUrl = "mongodb+srv://voxite:voxite@cluster0.zmpxztq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("Connect to database");}).catch((e) => console.log("Error", e));

require("../server/models/Book2Details")
require("../server/models/UserDetails");

const UserInfo = mongoose.model("UserInfo");
const User = mongoose.model("BookingUserDetails");

index.post("/signup", async (req, res) => {
    const { name, address, phone, email, password, cpassword } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await UserInfo.findOne({email});
        if (oldUser) {
          return res.send({error: "User Already Exists"});
        }
        await UserInfo.create({
            name,
            address,
            phone,
            email,
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
        // Find the user in the database based on the provided email
        const user = await UserInfo.findOne({ email });

        // Check if the user exists and verify the password
        if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

index.post("/userdata", async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;

        UserInfo.findById(userId).then((data) => {
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
        res.json({ loggedIn: true, username: "Sakshi Patil" });
      }
    } else {
      res.json({ loggedIn: false, username: "" });
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    res.status(500).json({ loggedIn: false, username: "" });
  }
});

index.get('/logout', (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();
})
    
index.post("/booking2", async (req, res) => {
  const { name, address, phone, email, cityf, cityt, date1, date2, country, state, persons } = req.body;
  try {
      const oldUser = await UserInfo.findOne({email});
      if (!oldUser) {
        return res.send({error: "You are not registered"});
      }
      await User.create({
          name,
          address,
          phone,
          email,
          cityf,
          cityt,
          date1,
          date2,
          country,
          state,
          persons,
      });
      res.send({ status: "ok" });
  } catch (error) {
      res.send({ status: "error" });
  }
});

index.post("/booking1", async (req, res) => {
  const { phone } = req.body;

  try {
    // Find the user in the database based on the provided email
    const user = await User.findOne({ phone });

    // Check if the user exists and verify the password
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


index.post("/booked", async (req, res) => {
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
});



const port = process.env.PORT || 3001;
index.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
