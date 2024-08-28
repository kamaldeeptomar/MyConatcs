const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : [true, "Please enter username"]
    },
    email: {
        type : String,
        require : [true, "Please enter email"],
        unique: [true, "Already register"]
    },
    password: {
        type : String,
        require : [true, "Please enter password"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)