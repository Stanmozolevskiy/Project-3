//used for the react-bootstrap-tables in the FitnessLog page
const TablesSchema = new mongoose.Schema({

    id: {
        type: Int
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
        type: Int
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