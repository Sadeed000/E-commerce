import express from 'express'
import mongoose from 'mongoose'
 import userModel from '../models/userModel.js'
 const router = express.Router()
import bcrypt, { compare } from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
 export const registerController = async(req,res) => {
    try {
       const {name ,email, phone , password, cpassword } = req.body
       if(!name ,!email, !phone , !password, !cpassword){
         res.status(404).send({messege : "Each field must be required"})
       }

       const existingUSer = await userModel.findOne({email}) 
       if(existingUSer){
         res.status(404).send({
            success:false,
            messege:"Already registerd please login "})
       }
       console.log(password)
       const salt = 10
       const hashedPassword= await  bcrypt.hash(password, salt)
        const user = await new userModel({
         name,
         email,
         phone,
         password:hashedPassword,
         cpassword:hashedPassword,
       }).save()

       res.status(201).send({
         success :true,
         message:"Register successfully",
         user

       })
 console.log(user)

    }  catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
 }

 export const loginController = async (req,res) => {
  try {
    const {email , password } = req.body
    if(!email,!password){
      return res.send({success:false,
      message:'plz fill both filled'})
    }
    const user = await User.findOne({email})
    if(!user){
      res.status(404).send({
        success:false,
        message:'email is not registerd'
      })
    }
   const match = await bcrypt.compare(password,user.password)
       if(!match){
        res.status(400).send({
          success:false,
          message:'invalid pasword'
        })
       }

       const token = await jwt.sign({_id:user._id},"sdfghjhgdfgh",{
        expiresIn: "7d",
      })
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role:user.role
        },
        token,
      });
  } catch (error) {
    console.log(error)
  }
  //  try {
  //     const{email , password} = req.body
  //   console.log(email,password)
  //  if(!email , !password){
  //    return res.status(404).send({
  //        success:false,
  //        message:'Inavlid email or password'
  //     })
  //   }
  //     const user = await User.find({email})
  //     if (!user){
  //      return res.status(404).send({
  //        success:"false",
  //        messege:"email is not registerd"
  //      })
      
  //     }
  //  } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success:false,
  //     message:'error in login',
  //     error
  //   })  
  //    }
 }