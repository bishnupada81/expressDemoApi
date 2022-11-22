require('dotenv').config();
const express = require('express')
const router = express.Router()
const dbService = require('../lib/database')
const { DB_NAME,TODO_COLL,REGISTER } = require('../constants/collection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbQuery = require('../services/login-service')
const authToken = require('../middleware/auth')

router.post('/user',authToken.authenticationToken,async(req,res) => {
  const client = await dbService.getClient();

  const userData = await client
                          .db(DB_NAME)
                          .collection(REGISTER)  
                          .findOne({user_name:req.user.name})
  return res.status(200).json({
    success: true,
    data: userData,
  })

})

router.post('/register', async(req,res) =>{
  try{

    const payload = req.body;
    const client = await dbService.getClient();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(payload.password,salt)
    const registerData = {user_name:payload.user_name, password:hashedPassword}

    const userData = await dbQuery.findUser(payload.user_name,client)
    
    if(userData){
      return res.status(409).json({
        success: true,
        message: 'user name is already in use',
      })
    }

    client
      .db(DB_NAME)
      .collection(REGISTER)  
      .insertOne(registerData)
      res.status(201).json({
        success: true,
        message: 'User Register successfully!',
      })
  }catch(err){
    console.log(err.toString())
  }

})

router.post('/login',async(req,res)=>{

  const payload = req.body;
  const client = await dbService.getClient();
  const userName = payload.user_name;

  const userData = await dbQuery.findUser(userName,client)


  if(!userData){
    return res.status(400).json({
      success: true,
      message: 'Can not find user',
    })
  }

  try{

    const user = { name:userName }
    const givenPassword = payload.password;
    const verifyPassword = await bcrypt.compare(givenPassword,userData.password);

    if(!verifyPassword){
      return res.status(500).json({
        success: true,
        message: 'password is not correct, please use correct password'
      })
    }

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({
      success: true,
      message: 'User Login successfully!',
      data   : accessToken
    })
  }catch(err){
    console.log(err.toString());
  }

})

module.exports = router