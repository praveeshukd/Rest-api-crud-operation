const express=require('express')
const router=express.Router()
  const jwt = require("jsonwebtoken");
 const bcrypt=require('bcrypt')
 // jwt token
 const JWT_URL="sjsjsjsjsj"
 const User = require("../db/userSchema");


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *          "required": [
 *         "username",
 *         "email",
 *         "password"
 *        ],
 *       properties:
 *         password:
 *           type: string
 *           description: user password
 *         username:
 *           type: string
 *           description:username
 *         email:
 *           type: string
 *           description:email
 *       example:
 *         id: d5fE_asz
 *         title: thunivu
 *         director: h vinodh
 */
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: signup user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: user already exsist
 *       500: 
 *           "description": "Internal server error"        
 */
router.post('/signup',async(req,res)=>{
    try {
        // Checking required fields //
        let { username, password, email } = req.body;
        console.log(req.body)
        if (!username || !email || !password) {
          res.status(400).json({ message: "Please enter all fields" ,error:true});
          return
        }
    
        let user = await User.findOne({ email: email });
        if (user) {
          return res.status(400).json({
            message: "User Already Exists",
            error:true,
          });
        }
        password=await bcrypt.hash(password,12)
        User.create({
            username,password,email
        }).then((result)=>{
            res.status(200).json({message:"user created successfully",error:false})
        })
    
      } catch (error) {
      
        res.status(409).json({ message:error.message  ,error:true});
      }

})
//.....................login..............//

/**
 * @swagger
 * components:
 *   schemas:
 *     Userlogin:
 *       type: object
 *          "required": [
 *         "email",
 *         "in": "body",
 *         "password"
 *        ],
 *       properties:
 *         password:
 *           type: string
 *         email:
 *           type: string
 *       example:
 *         id: d5fE_asz
 *         title: thunivu
 *         director: h vinodh
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: user login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: user already exsist
 */
router.post('/login',async(req,res)=>{
    try {
        let { password, email } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please enter all fields",error:true });
      return
    }
    let existingUser = await User.findOne({email:email})
  if(!existingUser) throw Error("no user found")
      const existingUserPassword=await bcrypt.compare(password,existingUser.password)
      if(!existingUserPassword){
        return res.status(400).json({
            message: "Incorrect Password !",
            error:true
          })
      }
  jwt.sign(
        {email},
        process.env.JWT_URL,
        {
          expiresIn: "1h"
        },
        (err, token) => {
          if (err) throw err;
          console.log(token)
          res.status(200).json({
            token,
            message:"user successfully logined",
            error:false
          });
        }
      )
      
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error:true
          });
    }
    

})

// export
module.exports=router