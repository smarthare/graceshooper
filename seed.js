"use strict";
const User = require("./server/api/user/user.model");

module.exports = () => {
  return Promise.all([
    User.create({
      name: "AJ Frank",
      email: "alexanderjfrank@gmail.com",
      imgUrl:
        "https://sendgrid.com/wp-content/uploads/2017/07/Headshot-178x178.jpg"
    }),
    User.create({ name: "Ariel Frank", email: "arielfrank@gmail.com" })
  ]).catch(err => console.error(err));
};
