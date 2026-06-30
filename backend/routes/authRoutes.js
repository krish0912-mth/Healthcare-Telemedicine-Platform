const express=require("express");

const router=express.Router();

const {

registerValidation,

loginValidation

} = require("../validations/authValidation");


const { validationResult } = require("express-validator");
const validate = (req,res,next)=>{

const errors = validationResult(req);

if(!errors.isEmpty()){

return res.status(400).json({

errors:errors.array()

});

}

next();

};
const {
registerUser,
loginUser

}=require("../controllers/authController");


const { 
protect,
authorizeRoles
} = require("../middleware/authMiddleware");

router.post(
"/register",
registerValidation,
validate,
registerUser
);


router.post(
"/login",
loginValidation,
validate,
loginUser
);
router.get("/profile", protect, (req,res)=>{

res.json({
message:"Protected route accessed",
user:req.user
});

});
router.get(
"/doctor-only",

protect,

authorizeRoles("doctor"),

(req,res)=>{

res.json({
message:"Welcome Doctor"
});

}

);


module.exports=router;