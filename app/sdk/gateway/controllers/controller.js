//const {validationResult} = require('express-validation/check');
'use strict';
var bcSdk = require('../gateway');
var data


//Posting Data in MongoDb//
exports.createPost = (req, res, next) => {
  console.log("entering into newRequest function.....!")
  const transferfrom = req.body.transferfrom
  const transferto = req.body.transferto
  const value = req.body.value
  console.log("transferfrom----->",transferfrom)
  var addData =({
    transferfrom : transferfrom,
    transferto : transferto,
    value: value
  });


  bcSdk.transferData({ 
    UserDetails : addData
  })
 // next()
  .then(result => {
    console.log("data---->>>",result)
    res.status(201).json({
      message: result,
   //   post: result
    //console.log(result)
  });
})
  
  .catch(err => {
   // console.log("err---->",err)
    res.status(400).json({
      message: err
    })   
  });
  }
