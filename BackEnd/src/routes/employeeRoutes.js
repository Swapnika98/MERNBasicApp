const express = require('express');

const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/fetch',function middleware(req,res,next){
    next();
},employeeController.fetchRecords);

router.post('/create',employeeController.createRecords);

router.get('/fetch/:fetchId', employeeController.fetchRecord);

router.put('/fetch/:fetchId', employeeController.updateRecord);

router.delete('/fetch/:fetchId', employeeController.deleteRecord);

module.exports = router;