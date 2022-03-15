const mongoose = require('mongoose');
const Employee = require('../models/Employee');
exports.fetchRecords = (req,res,next) => {
    Employee.find().then(records => {
        res.status(200).json({message: 'Fetched successfully', posts: records})
    }).catch(err=>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.createRecords = async (req,res,next) => {
    const data = JSON.parse(req.body.data)
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const salary = data.salary;
    const hr_id = mongoose.Types.ObjectId(data.hr_id);
    
    const employee = new Employee({
        name,email,phone,salary,hr_id
    })

    const existingEmp = await Employee.findOne({phone});
    if(existingEmp) {
        return res.status(404).send({error:'Employee already exists'})
    }

    employee.save().then(result => {
        res.status(201).json({
            message: "Employee record created successfully",
            post: result
        })
    }).catch(err=>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    
}

exports.fetchRecord = (req,res,next) => {
    const fetchId = req.params.fetchId;
    Employee.findById(fetchId).then(record => {
        if(!record) {
            const error = new Error('No record found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Record fetched successfully', post: record})
    }).catch(err=>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updateRecord = (req,res,next) => {
    const fetchId = req.params.fetchId;
    const data = req.body;
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const salary = data.salary;
    // const hr_id = mongoose.Types.ObjectId(data.hr_id);

    Employee.findById(fetchId).then(record=>{
        if(!record) {
            const error = new Error('No record found');
            error.statusCode = 404;
            throw error;
        }
        record.name = name; 
        record.email = email; 
        record.phone = phone; 
        record.salary = salary; 
        // record.hr_id = hr_id;
        return record.save(); 
    }).then(result => {
        res.status(200).json({message: 'Post Updated',post: result})
    }).catch(err=>{
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    
}

exports.deleteRecord = (req,res,next) => {
    const fetchId = req.params.fetchId;
    Employee.findById(fetchId).then(record => {
        if(!record) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        return Employee.findByIdAndRemove(fetchId);
    }).then(result => {
        res.status(200).json({message: "Record Deleted Successfully"})
    })
}