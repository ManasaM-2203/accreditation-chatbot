// models/queryModel.js
import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Query = mongoose.model("Query", querySchema);
export default Query;
