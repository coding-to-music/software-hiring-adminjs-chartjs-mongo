const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const StreetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    fromStreet: {
        type: String,
        required: false,
    },
    to: {
        type: String,
        required: false,
    },
    width: {
        type: Number,
        required: false,
    },
    streetLength: {
        type: Number,
        required: false,
    },
    streetDate: {
        type: Number,
        required: false,
    },
    noncity: {
        type: String,
        required: false,
    },
    unnacceptedlength: {
        type: String,
        required: false,
    },
    area: {
        type: Number,
        required: false,
    },
    // createdAt         DateTime  @default(now()) @map(name: "created_at")
    // createdAt: {
    //     type: Date,
    //     required: false,
    // },
    // // updatedAt         DateTime  @default(now()) @map(name: "updated_at")
    // updatedAt: {
    //     type: Date,
    //     required: false,
    // },

    // username: {
    //     type: String,
    //     unique: true,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // phoneNumber: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
});

// StreetSchema.statics.findAndValidate = async function (username, password) {
//     const Street = await this.findOne({ username });
//     if (Street) {
//         const isValid = await bcrypt.compare(password, Street.password);
//         return isValid ? Street : false;
//     }
//     return false;
// };

// StreetSchema.pre("save", async function (next) {
//     // neu password duoc sua doi
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//         return next();
//     }
//     return next();
// });

// // automatically add a username and password

const Street = mongoose.model("Street", StreetSchema);

module.exports = Street;
