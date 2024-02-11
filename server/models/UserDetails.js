const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        phone: Number,
        email: {type: String, unique: true},
        country: String,
        city: String,
        password: String,
        cpassword: String,
    },

    {
        collection: "UserInfo"
    }
);

const UserInfo = mongoose.model("UserInfo", UserDetailsSchema);

module.exports = UserInfo;