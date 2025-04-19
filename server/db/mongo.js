const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getOrdersCollection() {
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    const db = client.db('idosell');
    return db.collection('orders');
}

module.exports = getOrdersCollection;