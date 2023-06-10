const mongoose = require('mongoose');

let tripSchema = mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    noOfTravelers: Number,
    budgetPerPerson: Number,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports={Trip}