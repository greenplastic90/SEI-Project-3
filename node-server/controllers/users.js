import User from '../models/user.js'

export const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findOne({
      username: req.currentUser.username,
    })
    if (!userToDelete) throw new Error('User not found')
    await userToDelete.remove()
    return res.status(204).json('content')
    // console.log(userToDelete)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
export const getUserProfile = async (req, res) => {
  try {
    const profileToGet = await User.findOne({
      username: req.currentUser.username,
    })
      .populate('ownedEvents')
      .populate('likedEvents')
    if (!profileToGet) throw new Error('Unauthorized')
    return res.status(200).json(profileToGet)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
// export const getSingleProfile = async (req, res) => {
//   const { id } = req.params
//   try {
//     const profileToGet = await User.findOne({
//       _id: id,
//     })
//       .populate('ownedEvents')
//       .populate('likedEvents')
//     if (!profileToGet) throw new Error('Unauthorized')
//     return res.status(200).json(profileToGet)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ message: err.message })
//   }
// }

export const updateProfile = async (req, res) => {
  try {
    const userToUpdate = await User.findOne({
      username: req.currentUser.username,
    })
    if (!userToUpdate._id.equals(req.currentUser._id))
      throw new Error('Unauthorized')
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
