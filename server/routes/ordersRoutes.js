const Router = require("express");
const {getAllOrders, getSingleOrder} = require('../controllers/ordersController');
const basicAuth = require("../middleware/basicAuth");
const router = Router();

router.get('/orders', basicAuth, getAllOrders);
router.get('/orders/:orderId', basicAuth, getSingleOrder);

module.exports = router;