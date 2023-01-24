const express = require("express");
const router = express.Router();
const articlecontroller = require("../controllers/getarticle");
const passport=require('passport');

router.post("/create",articlecontroller.create);
router.get("/getarticle",passport.authenticate('jwt',{ session: false }), articlecontroller.getarticle);
router.patch("/update/:id",articlecontroller.update);
router.delete("/delete/:id",articlecontroller.delete);

module.exports = router;
