const jwt = require('jsonwebtoken')

const authToken = () =>{
  function authenticationToken(req,res,next){
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).json({
      success: true,
      message: 'Token is not present'
    })
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.status(403).json({
        success: true,
        message: 'Token in not valied'
      })
      req.user = user
      next()
    })
  }
  return { authenticationToken }
}
module.exports = authToken()