import Event from '../models/event.js'

export const getAllEvents = async (_req, res) => {
  try {
    const events = await Event.find().populate('owner')
    return res.status(200).json(events)
  } catch (err) {}
}

export const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params
    const eventToFind = await Event.findOne({
      _id: id,
    })
      .populate('owner')
      .populate('comments.owner')
      .populate('likedBy.owner')
    return eventToFind
      ? res.status(200).json(eventToFind)
      : res.status(404).json({ message: 'Event Not Found' })
  } catch (err) {}
}

export const createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      owner: req.currentUser._id,
    })
    return res.status(201).json(newEvent)
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    const eventToDelete = await Event.findOne({
      _id: id,
    })
    if (!eventToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await eventToDelete.remove()
    return res.status(204).json()
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params

    const eventToUpdate = await Event.findOne({ _id: id }).populate('likedBy.owner')
    if (!eventToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(202).json(eventToUpdate)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const updateEventLikedBy = async (req, res) => {
  try {
    const { eventID, userID } = req.params

    // Find the event to update
    const eventToUpdate = await Event.findById(eventID)

    if (!eventToUpdate) {
      return res.status(404).json({ message: 'Event not found' })
    }

    const index = eventToUpdate.likedBy.findIndex(
      (userLike) => userLike.owner.toString() === userID
    )

    if (index !== -1) {
      eventToUpdate.likedBy.splice(index, 1)
    } else {
      eventToUpdate.likedBy.push({ owner: userID })
    }

    const updatedEvent = await eventToUpdate.save()

    await updatedEvent.populate('likedBy.owner')

    return res.status(202).json(updatedEvent)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
