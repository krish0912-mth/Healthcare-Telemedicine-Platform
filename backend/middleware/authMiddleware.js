const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req,res,next)=>{

try{

let token = req.headers.authorization;


if(!token){

return res.status(401).json({
message:"No token found"
});

}


token = token.split(" ")[1];


const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);


req.user = await User.findById(
decoded.id
).select("-password");


next();


}
catch(error){

res.status(401).json({
message:"Invalid Token"
});

}

};

const authorizeRoles = (...roles)=>{

return (req,res,next)=>{


if(!roles.includes(req.user.role)){


return res.status(403).json({
message:"Access Denied"
});


}


next();


};


};



module.exports = {
protect,
authorizeRoles
};
