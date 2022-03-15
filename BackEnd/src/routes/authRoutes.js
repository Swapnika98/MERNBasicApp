const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const multer = require('multer')
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const fileStorage = multer.diskStorage({
    destination: (req,res,cb) => {
      cb(null,(path.join(rootDir,'images')));
    },
    filename: (req,file,cb) => {
      cb(null,Date.now().toString()+'-'+file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb) => {
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg') {
      cb(null,true);
    } else {
      cb(null,false);
    }
  }

const upload = (multer({storage: fileStorage,fileFilter:fileFilter}).single('profile'));
router.use('/images',express.static(path.join(rootDir,'images')));

router.post('/signup',upload,async (req,res)=>{
    let {name,email,phone,password}=req.body;
    if(!req.file){
            const error = new Error('No image provided.');
            error.statusCode = 422;
            throw error;
        }
        let profile = req.file.path.replace("\\" ,"/");
        profile = profile.split('src\\')[1]
        try {
            const user = new User({name,email,phone,password,profile})
            await user.save();
    
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY')
        res.send({user,token})

    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin',async(req,res)=>{
    const {phone,password} = req.body;
    if(!phone||!password){
        return res.status(422).send({error:'provide phone n pwd'});
    }
    const user = await User.findOne({phone});
    if(!user) {
        return res.status(404).send({error:'Phone number not found'})
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY')
        res.send({user,token})

    } catch (err) {
        return res.status(422).send({error:'Invalid phone or password'})
    }
})

module.exports = router;