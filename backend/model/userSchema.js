const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const {Schema} = mongoose

const userSchema = new Schema({
    name :{
        type:String,
        required :[true,"user name is required"],
        minLength:[5,"Name must be atleast 5 char"],
        maxLength:[50,"Name must be less than 50 char"],
        trim:true
    },
    email :{
        type:String,
        required:[true,"user email is required"],
        lowercase:true,
        unique1:[true,"Already registed email"]
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String,

    },
    forgotPasswordExpiryDate:{
        type:String
    }
},{
    timestamps:true
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
      { _id: this._id, email: this.email }, 
      process.env.SECRET,             
      { expiresIn: '24h' }
    );
  };


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;