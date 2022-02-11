import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 250 },
  },
  { timestamps: true }
)

const userLikesSchema = new Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const eventSchema = new Schema(
  {
    eventName: { type: String, required: true, maxlength: 40 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locationName: { type: String, required: true, maxlength: 58 },
    description: { type: String, required: true, maxlength: 3000 },
    eventDate: { type: String, required: true, maxlength: 30 },
    image: { type: String },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    likedBy: [userLikesSchema],
    eventType: [{ type: String }],
    comments: [commentSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Event', eventSchema)
