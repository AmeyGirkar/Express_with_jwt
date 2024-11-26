const userModel = require("../model/userSchema");
const emailvalidator = require('email-validator');

const signup= async (req,res) => {
    console.log(req.body)
    const {name ,email,password,confirmPassword} = req.body;

    try {

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                sucess:false,
                message: "Please enter all details"
            })
        }
         
        var validEmail = emailvalidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                sucess:false,
                message: "please provide valid email"
            })
        }

        if (password !== confirmPassword){
            return res.status(400).json({
                sucess:false,
                message: "Password and confirm password do not macth"
            })
        }

        const UserInfo = userModel(req.body);
        console.log(UserInfo)
        const result =await UserInfo.save()
        return res.status(200).json({
            sucess:true,
            data:result
        })
        
    } catch (error) {
        if (error.code === 11000){ 
           return res.status(400).json({
            sucess:false,
            message:"user already available"
        })
        }
        return res.status(400).json({
            sucess:false,
            message:error.message,
            data:{}
        })
        

    }
    // return res.status(200).json({
    //     success:true,
    //     data:[name,email,password,confirmPassword]
    // });

    //code

}

const signin =async (req,res) =>{

    const { email ,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
                sucess:false,
                message: "Please enter all details"

        })       
    }
    try {
        const user =await userModel.findOne({email}).select('+password');
        console.log(user)

        if (!user || password !== user.password) {
    
            return res.status(400).json({
                sucess:false,
                message: "please enter correct credential"   
        })}

       
    
        const token = user.generateAuthToken()
        user.password = undefined;

        const cookiesOptions ={
            maxAge: 24*60*60*1000,
            httpOnly:true
        }

        res.cookie("token",token ,cookiesOptions);

        res.status(200).json({
            sucess: true,
            data:user
        })

        
    } catch (error) {

        console.log(error)

        return res.status(400).json({
            sucess: false,
            message:error.message
        })
        
    }

}
const getuser = async (req,res) =>{
    const userId = req.user.id;
    console.log(userId)
    
    try {
        const user = await userModel.findById(userId);

        return res.status(200).json({
            sucess:true,
            message:"data isgot",
            data:user
        })
    }
    catch(error){

        return res.status(400).json({
        sucess: false,
        message: error.message  })

}}



module.exports = {
    signup,
    signin,
    getuser
}