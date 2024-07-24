require('dotenv').config();
const express=require('express');
const router= require('./routers/auth-routers')
const cart_router= require('./routers/cart-routers')
const admin_router= require('./routers/admin-routers')
const orderRouter = require('./routers/order-routers');
const cors = require('cors');
const path = require('path');
const connectDB=require('./utils/db')
const app=express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',router);
app.use('/api/cart',cart_router);
app.use('/api/orders', orderRouter);
app.use('/api/',admin_router);

// Serve static files (assuming your JSON file is in 'api' folder)
app.use('/api', express.static(path.join(__dirname, 'api')));

const PORT= 5000;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`your server is running on : ${PORT}`)
    })
})