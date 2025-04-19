const getOrdersCollection = require('../db/mongo');
const ordersToCsvRows = require("../utils/ordersToCsvRows");
const stringify = require('csv-stringify').stringify;

async function getAllOrders(req, res) {
    await sendOrdersCsv(req, res);
}

async function getSingleOrder(req, res) {
    const orderID= req.params.orderId;
    const format = req.query.format;

    if(format === 'csv'){
        await sendOrdersCsv(req, res, { orderID});
    }else{
        const collection = await getOrdersCollection();
        const order = await collection.findOne({ orderID});

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    }
}

async function sendOrdersCsv(req, res, customFilter = {}) {
    const {minWorth, maxWorth} = req.query;
    const collection = await getOrdersCollection();

    if(customFilter.orderID){
        const order = await collection.findOne({orderID: customFilter.orderID});
        if(!order) return res.status(404).json({ message: 'Order not found' });
    }

    const filter = {...customFilter};
    console.log(customFilter);
    if(minWorth) filter.orderWorth = {...filter.orderWorth, $gte: Number(minWorth)};
    if(maxWorth) filter.orderWorth = {...filter.orderWorth, $lte: Number(maxWorth)};

    const orders = await collection.find(filter).toArray();

    const csvData = ordersToCsvRows(orders);

    stringify(csvData, { header: true }, (err, output) => {
        if (err) return res.status(500).send('CSV generation error');
        res.setHeader('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        res.send(output);
    });
}

module.exports = {
    getAllOrders,
    getSingleOrder
}