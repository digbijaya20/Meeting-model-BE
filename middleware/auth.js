 require('dotenv').config()
 const jwt = require('jsonwebtoken')

 const auth = (req, res, next) =>{

     //Get token from header

     const token = req.header('auth-token')

      // check if not token
      
     if(!token){
         return res.status(401).json({msg:'No token, access denied'})
     }
     try {
         const decorded = jwt.verify(token, process.env.SECRET)
         req.user = decorded.user
         next()
     } catch (err) {
         res.status(401).json({msg:'Invalid token'})
     }
 }

 module.exports = auth;