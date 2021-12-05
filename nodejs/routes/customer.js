const express = require("express");
const route = express.Router();
const customerController = require("../controllers/customer");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const DIR = './uploads/';
const Customer = require("../models/customer");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
   }
});

var upload = multer({
  storage: storage
   // , fileFilter: (req, file, cb) => {
   //    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/pdf") {
   //       cb(null, true);
   //    } else {
   //       cb(null, false);
   //       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
   //    }
   // }
});


route.post("/:id", upload.single('currentImg'), (req, res, next) => {
const url = req.protocol + '://' + req.get('host')
Customer.findByIdAndUpdate(req.params.id,{weightImg:{currentImg:url +'/uploads/'+ req.file.filename,date:new Date()}},{new:true})
.then(customer=>{
    return res.status(200).send(customer)
})
.catch(err=>{return res.status(400).send(err.message)})
})



route.patch("/:id/:tafrit", upload.single('file'),async (req, res, next) => {
   const url = req.protocol + '://' + req.get('host')
   let user
   let body = await Customer.findById(req.params.id)
   try{
   if(req.params.tafrit== 'breakfast')
   user = await Customer.findByIdAndUpdate(req.params.id,{menu:{breakfast:url +'/uploads/'+ req.file.filename,lunch:body?.menu?.lunch ,dinner:body?.menu?.dinner}},{new:true})
   if(req.params.tafrit== 'lunch')
   user = await Customer.findByIdAndUpdate(req.params.id,{menu:{lunch:url +'/uploads/'+ req.file.filename,breakfast:body?.menu?.breakfast,dinner:body?.menu?.dinner}},{new:true})
   if(req.params.tafrit== 'dinner')
   user = await Customer.findByIdAndUpdate(req.params.id,{menu:{dinner:url +'/uploads/'+ req.file.filename,breakfast:body?.menu?.breakfast,lunch:body?.menu?.lunch}},{new:true})
   if(user)
   return res.status(200).send(user)
   return res.status(404).send("user not found")
   }
   catch(err){return res.status(400).send(err)}
})

route.get("/", customerController.getAll)
route.get("/:id", customerController.getById)
route.post("/",customerController.postCustomer)
route.put("/:id", customerController.updateCustomer)
route.delete("/:id", customerController.deleteCustomer)
module.exports = route;