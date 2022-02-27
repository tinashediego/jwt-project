require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
//const auth = require("../middleware/auth");

const register=(async (req, res) => {
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  const login = (async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
  
  const index = (req, res) => {
    User.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json({response:data})
        }
      });
    //res.status(200).send("Welcome 🙌 ");
  };

  const userById = (req,res)=>{
    User.findById(req.params.id, (error, data) => {
        if (error) {
          return next (error);
        }else {
          res.json(data)
        }
      })
  };

  const updateUser = (req,res,next)=>{
    let id = req.params.id
    User.findByIdAndUpdate(id,{$set: req.body},{new:true})
    .then(()=>{
        res.json({message: "User updated successfully"})
    }).catch(()=>{
        res.json({message: "An error occured"})
    })
}

const deleteUser = (req,res,next)=>{
    let id = req.params.id

    User.findByIdAndRemove(id)
    .then(()=>{
        res.json({message: "User removed successfully"})
    }).catch(()=>{
        res.json({message: "An error occured"})
    })
}
  

  module.exports = {index, register, login, userById, updateUser, deleteUser}