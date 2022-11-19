const { MongoClient } = require('mongodb')

const dbService = () => {
  let client = null;
  url = process.env.DB_URL

   async function getClient(){

    try{
      if(client) return client;

      client = new MongoClient(url);

      await client.connect();

      return client;

    } catch(err){

      console.log('DB connect error',err.toString());

    }
    
   }
   return { getClient };
}

module.exports = dbService();