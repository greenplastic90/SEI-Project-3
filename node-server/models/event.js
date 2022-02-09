import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema(
  {
    //owner
    text: { type: String, required: true, maxlength: 250 },
  },
  { timestamps: true }
)

const eventSchema = new Schema(
  {
    eventName: { type: String, required: true, maxlength: 40 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locationName: { type: String, required: true, maxlength: 58 },
    description: { type: String, required: true, maxlength: 3000 },
    eventDate: { type: String, required: true, maxlength: 30 },
    image: { type: String },
    // owner
    //likedBy: [users]
    eventType: [{ type: String }],
  },
  { timestamps: true }
)
