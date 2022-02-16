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
export const getProfile = async (req, res) => {
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

// export const updatePassword = async (req, res) => {
//   try {
//     const passUpdate = await User.findOne({
//       password: req.currentUser.password,
//     })
//     if (!passUpdate._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
//     Object.assign(passUpdate, req.body)
//     await passUpdate.save()
//     return res.status(202).json(passUpdate)
//   } catch (error) {
//     console.log(error)
//     return res.status(401).json({ message: error.message })
//   }
// }
