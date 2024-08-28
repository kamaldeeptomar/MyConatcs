const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
       user_id: {
        type: mongoose.Schema.Types.ObjectId,
        requires: true,
        ref: "user"
       },
       name : {
        type: String,
        required: [ true, "Please add the name"]
       },
       email : {
        type: String,
        required: [ true, "Please add the email"]
       },
       phone : {
        type: String,
        required: [ true, "Please add the phone"]
       }
},
{
    timestamps: true
});

module.exports = mongoose.model("Contact",contactSchema)