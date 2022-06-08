import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

let client  = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

async function database(req, res, next) {
    client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     await client.connect()
  
  req.dbClient = client;
  req.db = client.db('sample_analytics');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;