
const express = require('express');

const { Trip } = require('../model/book.model');

const bookRoute = express.Router();

bookRoute.post('/api/trip', async (req, res) => {
    let { name, email, destination, noOfTravelers, budgetPerPerson } = req.body;
    try {
        let newtrip = new Trip({
            name,
            email,
            destination,
            noOfTravelers,
            budgetPerPerson,
        });
        await newtrip.save();
        res.status(201).send({ "Message": "New Trip added successfully", "Trip": newtrip });
    } catch (error) {
        console.log('Error:' + error);
        res.status(500).send({ "Message": error.message })
    }
});

// get all trips

// bookRoute.get('/api/trip', async (req, res) => {
//     try {
//         let alltrips = await Trip.find();
//         res.status(200).send({ "Message": "All Trips", 'trips': alltrips });
//     } catch (error) {
//         console.log("Error:" + error);
//         res.status(500).send({ Message: error.message });
//     }
// });

// delete a trip


bookRoute.delete("/api/trip/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let trip = await Trip.findByIdAndDelete(id);
        res.status(202).send({ "message": "Trip deleted successfully" })
    } catch (error) {
        console.log("Error:" + error);
        res.status(500).send({ Message: error.message });
    }
});

bookRoute.get('/api/trip/', async(req, res) => {
    const { destination, sort_by } = req.query;

    let data=await Trip.find()

    const filData = destination ? data.fiter((trip) => trip.destination == destination)
    
        : data
    
    const sortData = sort_by == "budgetPerPerson"
        ? filData.sort((a, b) => a.budgetPerPerson - b.budgetPerPerson)
        : filData;
    
    res.status(200).send({"Messsage":"Trips Data",'trips':sortData})
})



module.exports={bookRoute}