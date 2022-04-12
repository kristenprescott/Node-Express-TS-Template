import { Schema, model, Types } from "mongoose";

// Interface representing a document in MongoDB
interface IExample {
  id: Types.ObjectId;
  name: string;
  isComplete?: boolean;
  createdAt?: Date;
}

// Schema corresponding to the document interface
const exampleSchema = new Schema<IExample>({
  id: { type: Schema.Types.ObjectId, ref: "id" },
  name: { type: String, required: true },
  isComplete: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

// Model
export const Example = model<IExample>("Example", exampleSchema);

/*
EX:
const mySchema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
})
*/
