const jwt = require('jsonwebtoken')

const verfiyToken=(req,res,next)=>{
    try {
        const header = req.header("Authorization").split(" ");
        const token = header[1]
        if(!token){
            res.status(400).json({errorMessage:"Bad reqeust"})
        }
        const decode = jwt.verify(token,process.env.SECERT_KEY)
        req.userId=decode.userId
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports=verfiyToken