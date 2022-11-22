const { DB_NAME,TODO_COLL,REGISTER } = require('../constants/collection')
const dbQuery = () => {
  async function findUser (userdata,client){

    const userData = await client
                            .db(DB_NAME)
                            .collection(REGISTER)  
                            .findOne({user_name:userdata})
    return userData;
  
  }
  return { findUser };
}


module.exports = dbQuery()