const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director=require('../models/Director')

router.post('/', (req, res, next) =>{   
    const director=new Director(req.body);
    const promise = director.save();
    
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});
  
router.get('/',(req,res)=>{
    const promise = Director.aggregate([
        {
            $lookup: {
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
               _id:'$_id.id',
               name:'$_id.name',
               surname:'$_id.surname',
               movies:'$movies'
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
});

router.get('/:director_id',(req,res)=>{
    const promise = Director.aggregate([
        {
            $match:{
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
               _id:'$_id.id',
               name:'$_id.name',
               surname:'$_id.surname',
               movies:'$movies'
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json(error);
    });
});

router.put("/:director_id",(req,res,next)=>{
    const promise =Director.findByIdAndUpdate(
      req.params.director_id,
      req.body,
      {new:true}
      );
  
    promise.then((director)=>{
      if(!director)
        next({message:'The director was not found',code:99})
      res.json(director);
    }).catch((err)=>{
      res.json(err);
    });
});
  

router.delete("/:director_id",(req,res,next)=>{
    const promise =Directorgit.findByIdAndRemove(req.params.director_id);
  
    promise.then((director)=>{
      if(!director)
        next({message:'The director was not found',code:99});
  
      res.json({status:1});
    }).catch((err)=>{
      res.json(err);
    });
});

module.exports = router;
