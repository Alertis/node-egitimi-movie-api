const express = require('express');
const router = express.Router();
const User=require('../models/User.js');
const bcrypt=require('bcrypt-nodejs');
const jwt=require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) =>{
  const {username,password}=req.body;
  
  bcrypt.hash(password,bcrypt.genSaltSync(10),null,(err,hash)=>{
    if(err)
      throw err;
  
    const user=new User({
      username,
      password:hash
    });
  
    const promise=user.save();
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err);
    })
 })
});

router.post('/authenticate', (req, res, next) =>{
  const {username,password}=req.body;
  User.findOne({
    username
  },(err,user)=>{
    if(err)
      throw err;
    if(!user){
      res.json({
        status:false,
        message:'Authentication failed: User not found.'
      });
    }else{
      bcrypt.compare(password,user.password,(err,result)=>{
        if(err)
          throw err;
        if(!result){
          res.json({
            status:false,
            message:'Authentication failed: Wrong password'
          });
        }else{
          const payload={
            username
          };
       //   res.send(req.app.get('api_secret_key'))
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:720 //12 Saat
          });
          res.json({
            status:true,
            token
          })
        }
    
      });
    }
  });
});

module.exports = router;
