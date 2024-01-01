import mongoose from 'mongoose'
import express from 'express'
const ConnectDb = async() => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1/new")
    console.log('connection successfull')
    
  } catch (error) {
    console.log(error)
  }
}
export default ConnectDb