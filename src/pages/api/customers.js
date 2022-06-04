import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('customers').findOne()
    console.log(doc);
    res.json(doc);
});

handler.post(async (req, res) => {

    let doc = await req.db.collection('customers').updateOne()
    console.log(doc);
    res.json(doc);
});

export default handler;