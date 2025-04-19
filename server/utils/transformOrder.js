function transformOrder(order) {
    return {
        orderID: order.orderId,
        orderWorth: order.orderDetails?.payments?.orderCurrency?.orderProductsCost,
        products: (order.orderDetails?.productsResults).map(p => ({
            productID: p.productId,
            quantity: p.productQuantity
        }))
    };
}

module.exports = transformOrder;