import Event from '../models/event.js'

export const addComment = async (req, res) => {
  try {
    const { id } = req.params

    const eventToAddCommentTo = await Event.findById(id)
    if (!eventToAddCommentTo) throw new Error('Event not found')
    if (!req.body.text) throw new Error('Can\'t submit an empty comment')

    const newComment = {
      ...req.body,
      owner: req.currentUser,
    }
    eventToAddCommentTo.comments.push(newComment)
    await eventToAddCommentTo.save()
    // console.log(eventToAddCommentTo.comments)
    return res.status(201).json(newComment)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const eventToDeleteCommentFrom = await Event.findById(id)
    if (!eventToDeleteCommentFrom) throw new Error('Event not found')
    const commentToDelete = eventToDeleteCommentFrom.comments.id(commentId)
    if (!commentToDelete) throw new Error('Comment not found')
    if (!commentToDelete.owner.equals(req.currentUser._id))
      throw new Error('Unauthorised')
    await commentToDelete.remove()
    await eventToDeleteCommentFrom.save()
    return res.status(204).json('hallo!')
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
