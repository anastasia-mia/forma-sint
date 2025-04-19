const express = require('express');
const ordersRouter = require('./routes/ordersRoutes');

const app = express();
app.use(express.json());

app.use('/api', ordersRouter);

app.listen('3000', () => {
    console.log('Server running on port 3000')
})