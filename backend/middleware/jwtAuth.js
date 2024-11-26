const jwt = require('jsonwebtoken')

const jwtAuth = (req,res,next) =>{

    //verifyToken
    //Verify user Info
    const token = (req.cookies && req.cookies.token) || null;
    if (!token){
        return res.status(400).json({
            sucess: false,
            message:"Not authorized"
        })
    }

    try {
        const payload = jwt.verify(token,process.env.SECRET);
        // console.log("==========================")
        console.log(payload)
        req.user = {id: payload._id ,email:payload.email}
   
        
    } catch (error) {
        return  res.status(400).json({
            success: false,
            message: error.message
        
    })
}

    next();
}

module.exports = jwtAuth