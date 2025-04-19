function ordersToCsvRows (orders){
    const csvData = [];

    orders.forEach(order => {
        order.products.forEach(product => {
            csvData.push({
                orderID: order.orderID,
                orderWorth: order.orderWorth,
                productID: product.productID,
                quantity: product.quantity
            });
        });
    });

    return csvData;
}

module.exports = ordersToCsvRows;