import { Schema, model, Document } from "mongoose";

export interface IBot {
  initialAsk: number;
  ask: number;
  initialBid: number;
  bid: number;
  pair: string;
  currency: string;
  time: string;
  diff: number;
  diffPercent: number;
  type: string;
}

const botSchema = new Schema(
  {
    initialAsk: {
      type: Number,
      required: true,
    },
    ask: {
      type: Number,
      required: true,
    },
    initialBid: {
      type: Number,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
    pair: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    diff: {
      type: Number,
      required: true,
    },
    diffPercent: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBot>("Bot", botSchema);
