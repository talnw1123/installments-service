const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            unique: true
        },
        lastName:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
  
//   // Generate JSON Web Token (JWT)
// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return token;
//   };
  
module.exports = mongoose.model("User", userSchema);
