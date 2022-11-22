require('dotenv').config();
const { DB_NAME,TODO_COLL,REGISTER } = require('../constants/collection')
const jwt = require('jsonwebtoken')


const dbQuery = () => {

  async function findUser (userdata,client){

    const userData = await client
                            .db(DB_NAME)
                            .collection(REGISTER)  
                            .findOne({user_name:userdata})
    return userData;
  
  }

  function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15s'})
  }
  return { findUser,generateAccessToken };
}


module.exports = dbQuery()