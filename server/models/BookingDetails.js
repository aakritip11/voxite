const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        tourName: String,
        location: String,
        duration: String,
        numberOfPersons: Number,
        fees: String,
    },

    {
        collection: "BookingInfo"
    }
);

const BookingInfo = mongoose.model('BookingInfo', bookingSchema);

module.exports = BookingInfo;
