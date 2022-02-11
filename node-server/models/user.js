import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const { Schema } = mongoose
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
    minlength: 5,
  },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  profilePhoto: String,
  profileDescription: { type: String, maxlength: 280 },
})

userSchema.virtual('ownedEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.virtual('likedEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'likedBy.owner',
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema.virtual('passwordConfirmation').set(function (passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation
})

userSchema.pre('validate', function (next) {
  if (
    this.isModified('password') &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }

  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// Plugin
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)
