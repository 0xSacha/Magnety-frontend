//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"
import { number } from "starknet"
import Vault from "../models/vault"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env


// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect("mongodb+srv://Sacha:Sacha123@cluster0.qcw22fq.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err))

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  })

  type DataFinance = {
    sharePrice: number;
    date: Date;
    gav: number;
  }[];

  const ContractSchema = new mongoose.Schema({
    fundAddress: String,
    name: String,
    symbol: String,
    strategy: String,
    tags: [String],
    dataFinanceD: [{
      sharePrice: Number,
      date: Number,
      gav: Number,
    }],
    dataFinanceW: [{
      sharePrice: Number,
      date: Number,
      gav: Number,
    }],
    dataFinanceM: [{
      sharePrice: Number,
      date: Number,
      gav: Number,
    }],
    dataFinance: [{
      sharePrice: Number,
      date: Number,
      gav: Number,
    }],
    dailyIncome: Number,
    weeklyIncome: Number,
    monthlyIncome: Number,
    totalIncome: Number,
    image: String
  })


  const UserSchema = new mongoose.Schema({
    userAddress: String,
    name: String,
    description: String,
    twitter: String,
    linkedin: String,
    telegram: String,
    profilePic: String
  })

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
  const Contract = mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
  const UserInfo = mongoose.models.User || mongoose.model("User", UserSchema);

  return { conn, Todo, Contract, UserInfo }
}