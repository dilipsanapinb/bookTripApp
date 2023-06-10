const express = require('express');

const { connection } = require('./config/db');

const {bookRoute}=require('./routes/book.route')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to TripPlan")
});

app.use('/book', bookRoute);
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log({"Message":error.message});
    }
    console.log(`Server is listening to port ${process.env.port}`);
})