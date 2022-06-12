//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"
import Vault from "../models/vault"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env


// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect("mongodb+srv://Sacha:Sacha123@cluster0.qcw22fq.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  })

  const ContractSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    description: String,
    type: String,
    min: Number,
    max: Number,
    lockup: Number,
    limit: Number,
    entranceFees: String,
    exitFees: String,
    managementFees: String,
    performanceFees: String,
    tags: [],
    image: String
  })


  const UserSchema = new mongoose.Schema({
    userAddress: String, 
    name: String,
    description: String,
    image: String,
    banner: String,
  })

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
  const Contract = mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  return { conn, Todo, Contract, User }
}