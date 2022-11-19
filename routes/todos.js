const express = require('express')
const router = express.Router()
const dbService = require('../lib/database')
const { DB_NAME,TODO_COLL } = require('../constants/collection')
const { ObjectID } = require('mongodb')

//Insert Data in the Database
router.post('/', async(req,res)=>{
  try{
    const client = await dbService.getClient();
    const payload = req.body;
    client
      .db(DB_NAME)
      .collection(TODO_COLL)  
      .insertOne(payload)
    res.status(201).json({
      success: true,
      message: 'Insert successfully!',
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.toString(),
    })
  }
  
})

//Show all the data in the database
router.get('/',async (req,res)=>{
  try{
    const client = await dbService.getClient();
    const result = await client
                          .db(DB_NAME)
                          .collection(TODO_COLL)  
                          .find( {} )
                          .toArray()
    res.status(200).json({
      success: true,
      message: 'data fetch successfully!',
      data :result

    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.toString(),
    })
  }

})


//Show particular one data using id
router.get('/:id',async (req,res)=>{
  try{
    const client = await dbService.getClient();
    const id = req.params.id;
    const result = await client
                          .db(DB_NAME)
                          .collection(TODO_COLL)  
                          .find( {_id:ObjectID(id)} )
                          .toArray()
    res.status(200).json({
      success: true,
      message: 'data fetch successfully!',
      data :result

    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.toString(),
    })
  }

})

//Delete one data using id
router.delete('/:id',async (req,res)=>{
  try{
    const client = await dbService.getClient();
    const id = req.params.id;
    const result = await client
                          .db(DB_NAME)
                          .collection(TODO_COLL)  
                          .deleteOne( {_id:ObjectID(id)} )
    res.status(200).json({
      success: true,
      message: 'delete successfully!',
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.toString(),
    })
  }

})

//Update data using id
router.put('/:id',async (req,res)=>{
  try{
    const client = await dbService.getClient();
    const id = req.params.id;
    const payload = req.body;
    const result = await client
                          .db(DB_NAME)
                          .collection(TODO_COLL)  
                          .updateOne( {_id:ObjectID(id)},{$set: payload})
    res.status(200).json({
      success: true,
      message: 'updated successfully!',
      data:result
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.toString(),
    })
  }

})



  // router.put('/updateuser/:id', function(req, res) {
  //   var db = req.db;
  //   var userToUpdate = req.params.id;
  //   db.collection('userlist').update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
  //       res.send(
  //           (err === null) ? {msg: ''} : {msg: err}
  //       );
  //   });
  // });


module.exports = router;