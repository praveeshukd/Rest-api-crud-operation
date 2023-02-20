const jwt = require("jsonwebtoken");
function moviesAuthentication(req, res, next) {
  console.log("entered")
  const token = req.header("token");
  console.log(token)
  if (!token) return res.status(401).json({ message: "Auth Error",error:true });

  try {
    const decoded = jwt.verify(token, process.env.JWT_URL);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Invalid Token" ,error:true});
  }
};
async function userAuthentication(req,res,next){
  let token=req.header("token")
//token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNjc2ODA2ODMxLCJleHAiOjE2NzY4MTA0MzF9.Z1wVPKnGhnW2AIs3ytERkJ2SjOtcP1epoGZ7mAPRqe8"
try{
  if(token){
    const decoded = await jwt.verify(token, process.env.JWT_URL);

    res.status(200).json({ message: "user already logined",error:false });
    return
  }else{
    throw new Error()

  }
}catch(err){
  console.log(err.message,process.env.JWT_URL)
  next()
}

}
module.exports = {
  moviesAuthentication,
  userAuthentication

}