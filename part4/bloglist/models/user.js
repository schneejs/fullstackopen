const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: { type: String },
    // blogs: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Blog"
    //     }
    // ]
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;