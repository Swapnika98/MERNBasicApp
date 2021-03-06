const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    hr_id: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }
},{timestamps:true});

module.exports = mongoose.model('Employee',employeeSchema)