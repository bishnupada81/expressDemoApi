const express = require('express')
const router = express.Router()
const dbService = require('../lib/database')
const { DB_NAME,TODO_COLL,REGISTER } = require('../constants/collection')
const { ObjectID } = require('mongodb')
const bcrypt = require('bcrypt')

async function findUser (userdata,client){

  const userData = await client
                          .db(DB_NAME)
                          .collection(REGISTER)  
                          .findOne({user_name:userdata})
  return userData;

}

router.post('/register', async(req,res) =>{
  try{

    const payload = req.body;
    const client = await dbService.getClient();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(payload.password,salt)
    const registerData = {user_name:payload.user_name, password:hashedPassword}

    const userData = await findUser(payload.user_name,client)

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

  const userData = await findUser(userName,client)


  if(!userData){
    return res.status(400).json({
      success: true,
      message: 'Can not find user',
    })
  }

  try{

    givenPassword = payload.password;
    const varifyPassword = await bcrypt.compare(givenPassword,userData.password);

    if(!varifyPassword){
      return res.status(500).json({
        success: true,
        message: 'Not valied password please use correct password'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User found successfully!'
    })
  }catch(err){
    console.log(err.toString());
  }

})


module.exports = router