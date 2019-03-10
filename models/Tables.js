//used for the react-bootstrap-tables in the FitnessLog page
const mongoose = require('mongoose');
const TablesSchema = new mongoose.Schema({

    id: {
        type: Number
    },
    date: {
        type: Date
    },
    breakfast: {
        type: String
    },
    lunch: {
        type: String
    },
    dinner: {
        type: String
    },
    caloriesConsumed: {
        type: Number
    },
    exercise: {
        type: String
    },
    time: {
        type: String
    },
    intensity: {
        type: String
    },
    caloriesBurned: {
        type: String
    }
});

module.exports = mongoose.model('TablesSchema', TablesSchema);