const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken"); //Require for creating sessison & token
var fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "Iron Man is love";
router.post(
  "/createuser",
  [
    //This is authentication performed by EXPRESS VALIDATOR
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter password of atleast 5 character").isLength({
      min: 5,
    }),
    body("name", "Enter name of atleast 3 character").isLength({ min: 3 }),
  ],
  (req, res) => {
    let success=false;
    const result = validationResult(req);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (result.isEmpty()) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
          .then((user) => {
            const data = {
              user: {
                id: user.id,
              },
            };
            var token = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success,token});
            
          })
          .catch((err) => {
            res.json({success,message:"Email already taken"})
          });
      } else {
        res.json({success,errors: result.array() });
      }
    });
  }
);

//Used for login the User
router.post(
  "/login",
  [
    //This is authentication performed by EXPRESS VALIDATOR
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Password cannont be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log(passwordCompare);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success,error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,token });
    } catch {
      // console.error(error.message);
      res.status(500).json({success,message:"Internal Error"})
    }
  }
);

//First fetchUser will run (middleware) then callback function will run & we just modify req
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    //    console.log(req.user);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error");
  }
});
module.exports = router;
