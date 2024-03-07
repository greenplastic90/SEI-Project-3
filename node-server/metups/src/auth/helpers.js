import { Buffer } from 'buffer'

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('metups-login-token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}

export function getDayOfWeek(dateString) {
  // Split the date string and parse it to DD, MM, YYYY
  const parts = dateString.split('/')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1 // Month is 0-indexed in JavaScript Date
  const year = parseInt(parts[2], 10)

  // Create a new Date object
  const date = new Date(year, month, day)

  // Get the day of the week
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

export function getRandomEvents(arr, numEvents) {
  let result = []
  let copiedArray = [...arr]

  for (let i = 0; i < numEvents && copiedArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * copiedArray.length)
    result.push(copiedArray[randomIndex])
    copiedArray.splice(randomIndex, 1)
  }

  return result
}

export function userIsEventOwner(eventOwnerID) {
  return getPayload().sub === eventOwnerID
}
export const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
