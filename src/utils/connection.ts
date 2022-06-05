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

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

  return { conn, Todo }
}