const express=require('express');
const router=express.Router();
const logincontroller=require('../controllers/auth');

router.post('/',logincontroller.login);
module.exports=router
