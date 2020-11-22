const express = require("express");
const mongoose = require("mongoose");
const User = require("../database/User");
const route = express.Router();

route.get("/", async(request, response) => {
    const results = await User.find();
    response.json(results);
});

route.get("/:id", async(request, response) => {
    const { id } = request.params;

    const results = await User.findById(id);
    response.json(results);
});

route.post("/", async(request, response) => {

    const { firstName, lastName, mobileNumber, email } = request.body;
    console.log('fname', firstName, 'secondname', lastName, 'mn', mobileNumber, 'email', email)
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobileNumber = mobileNumber;
    user.email = email;

    //This will check//allow if the information matches the requirement.
    let userModel = new User(user);

    //First of all we need to check if have any user using the same email, if have we need to return a msg.
    const checkIfUserExists = await User.findOne({ email: user.email });
    console.log("aqui", checkIfUserExists);
    if (!!checkIfUserExists) {
        return response.json({
            message: "This email is already used by other user",
        });
    }
    // if not then we ask to save the data into to the database.
    try {
        await userModel.save();
    } catch (err) {
        return response.json({ message: "user canot be created" });
    }
    response.json(userModel);
});
route.put("/:id", async(request, response) => {
    const { firstName, lastName } = request.body;
    const { id } = request.params;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;

    const filter = { _id: id };
    const update = { firstName: user.firstName, lastName: user.lastName };

    await User.findOneAndUpdate(filter, update, {
        returnOriginal: false,
    });


    response.json({ firstName: user.firstName, lastName: user.lastName, mobileNumber: user.mobileNumber, email: user.email });
});



route.delete("/:id", async(request, response) => {
    const { id } = request.params;

    try {

        // looking for id and delete.
        await User.findByIdAndDelete(id);
    } catch (err) {
        return response.json({ message: 'user cannot be deleted.' })
    }

    response.json({ message: "user deleted" });
});

module.exports = route;