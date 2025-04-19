const axios = require('axios');
const getOrdersCollection = require("../db/mongo");
const transformOrder = require("../utils/transformOrder");
require('dotenv').config();

const ordersURL = `${process.env.BASE_URL}/api/admin/v5/orders/orders/search`;
const resultsLimit = 100;

async function fetchOrders(){
    let currentPage = 0;
    let totalPages = 1;

    const collection = await getOrdersCollection();

    while(currentPage < totalPages){
        try{
            const ordersData = await fetchOrdersByPage(currentPage);

            if(currentPage === 0){
                totalPages = ordersData.resultsNumberPage;
            }

            const transformedOrders = await ordersData.Results.map(order => transformOrder(order));

            await  insertOrdersIntoDB(collection, transformedOrders);

        }catch(error){
            console.log(error)
        }
    }
}

fetchOrders();

async function fetchOrdersByPage(currentPage) {
    try {
        const ordersData = axios.post(ordersURL,{params: {resultsPage: currentPage, resultsLimit}},  {
            headers: {
                'X-API-KEY': process.env.IDOSELL_API_KEY,
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(res => res.data);

        return ordersData;
    } catch (error) {
        console.error('Error getting orders:', error.response?.data || error.message);
    }
}

async function insertOrdersIntoDB(collection, orders){
    for(const order of orders){
        await collection.updateOne(
            {orderID: order.orderID},
            {$set: order},
            {upsert: true}
        )
    }
}