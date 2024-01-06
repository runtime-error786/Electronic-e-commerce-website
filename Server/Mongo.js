let express = require("express");
let mongodb = require("mongoose");
let app = express();
let cors = require("cors");
let jwt = require("jsonwebtoken");

const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
mongodb.connect("mongodb://127.0.0.1:27017/shopi")
  .then(() => {
    console.log("Connection successfully");
  })
  .catch(() => {
    console.log("Connection not successful");
  });

 let profsche =  mongodb.Schema(
    {
      fname:String,
      lname:String,
      phone:String,
      email:String,
      city:String,
      country:String,
      pass:String,
      profilePic: String ,
      role:String,
      tokens:[
        {
            type:String
        }
      ],
      cart: [
        {
          pname: String,
          quant: Number,
          price: Number,
          total: Number, // New field for total cost
        },
      ],
    }
  );

  profsche.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    user.tokens.push(token);
    await user.save();
    return token;
  };

  profsche.pre('save', function (next) {
    // Calculate total for each item in the cart
    this.cart.forEach(item => {
      item.total = item.price * item.quant;
    });
    next();
  });
  
  let prodsche =  mongodb.Schema(
    {
      pname:String,
      desc:String,
      quant:Number,
      img:String,
      price:Number,
      category:String
    }
  );

  
  let total = mongodb.Schema(
    {
      price:Number
    }
  );

module.exports={app,mongodb,profsche,prodsche,total};