# MetUps, a MERN stack app - GA Project Three - 7 Days

## Update

Projects front end and some backend functionality has been updated

- Complete overhaul of look and feel of the project (I was never happy with how the project was orginally styled)
- This app is now responsive and looks great on mobile as well

I have Left the rest of the README unedited.
The App is still deployed by Heroku and is available [here](https://metups.herokuapp.com).

##

This project was built with GA classmates [Mehtaab Masood](https://github.com/mmay95) and [Florent Haxhiu](https://github.com/florent-haxhiu).

![MetUps](https://i.imgur.com/PazoLOJ.png)

MetUps is a social networking website based around hosting and attending events near you. As a user of Metups, once you’ve signed up for an account you can view all the events near you, RSVP to events you’re interested in and keep track of all these events on your profile page. You can also create events of your own and have other users RSVP to your events.

## Demo

The App is deployed by Heroku and is available [here](https://metups.herokuapp.com).

## Brief

- **Build a full-stack application** by making your own backend and your own front-end
- **Use an Express API** to serve your data from a Mongo database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

## Features

- Sign up for a personal account.
- Create events.
- View events created by others and RSVP.
- Keep track of events.
- Search for events by name and filter search results by one or more categories.
- Leave comments on events.

## Technologies

- MongoDB
- Express
- React.js
- Node.js
- JavaScript
- JWT
- Axios
- Bcrypt
- Git + GitHub
- BootStrap
- Chakara UI
- react-select
- [react-map-gl](https://visgl.github.io/react-map-gl/)

### APIs Used

- [mapbox](https://www.mapbox.com)
- [mapbox Geocoding](https://docs.mapbox.com/api/search/geocoding/)
- [Cloudinary](https://cloudinary.com)

## Planning

![Imgur](https://i.imgur.com/fkwdH4r.png)

As a team using [Excalidraw](https://excalidraw.com) we worked on creating a wireframe of all the pages we would need. That helped us determine the data needed in our schemas and what endpoints were needed by each page.

![Trello](https://i.imgur.com/JUVeiMO.png)

We created a Trello board, filled the TODO section with pages and sections that needed to be done. Each of us would take a TODO, move it to DOING and add their name to it.

### For The Demo

This site is meant to be used and viewed by anyone anywhere in the world.
It would be an impossible task to populate our database with enough demo events so that no matter where someone views the site from, they would see events near them on the map. My workaround for this problem was once they enter a demo events page, I would populate the event address with a real street name from that location.

![Events Near You](https://i.imgur.com/Nwd5sMx.png)

Every demo event has its `isDemo` property set to `true`. Once a user logins into the site and allows access to their location, I get the location from the browser, then randomly assign each demo event a new longitude and latitude location that is randomly generated based on the user's current location.

```javascript
const eventsWithUpdatedLocations = data.map((event) => {
  if (userGeoLocation && event.isDemo) {
    return {
      ...event,
      longitude: getRandomInRange(-0.12, 0.12) + userGeoLocation.longitude,
      latitude: getRandomInRange(-0.08, 0.08) + userGeoLocation.latitude,
    }
  }

  return event
})
```

Once I have the new longitude and latitude of each demo event, I feed that information to mapbox's geocoding api and get back a street name.

```javascript
const getRealAddress = async (long, lat) => {
            try {
              const { data } = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${mapToken}`
              )
              setUpdatedEventLocation({
                longitude: item.longitude,
                latitude: item.latitude,
                locationName: data.features[0].place_name,
              })
            }
```

![Imgur](https://i.imgur.com/bC3WxsA.png)

### Creating Event

![Create Event](https://i.imgur.com/UsPGbGe.png)
I made a call to mapbox's geocoding api everytime the address field was updated. I populated the react-select `AsyncSelect` dropdown with the features returned. Once the user picked a feature, I used the longitude and latitude properties of the feature to display the location on a mapbox map.

```javascript
const forwardQuery = async (inputValue) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapToken}`
    )
    // console.log(data)
    return data.features.map((feature) => {
      return {
        ...feature,
        value: feature.place_name,
        label: feature.place_name,
      }
    })
  } catch (err) {
    console.log(err.response)
  }
}
```

![AsyncSelect](https://i.imgur.com/T79nhoI.gif)
I used Cloudinary api to save and create urls for the images uploaded. If an image isn't uploaded, a default MetUps image is uploaded to act as a default image.

### Event Page

![Imgur](https://i.imgur.com/CY5nZbN.gif)

All information relevant to an event is displayed here.

Users who visit the page are able to leave a comment and RSVP to the event. Once they RSVP, their profile image is displayed next to the RSVP button and they are able to view all events they are planning to attend in their profile page.

### Profile Page

Here a user can view a list of events they've created, events they would like to attend, create a new event, update password, and delete their own events.
![Profile Page](https://i.imgur.com/yC3CT02.gif)

### Events Page

Users are able to filter through events by event title and type.

![Events Page](https://i.imgur.com/OGBisvE.gif)

## Backend

The backend was worked on as a group.
Using mongoose we created two main schemas.

### User Schema

```javascript
const { Schema } = mongoose
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
    minlength: 5,
  },
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  profilePhoto: String,
  profileDescription: { type: String, maxlength: 280 },
  userLocation: { long: Number, lat: Number },
})
```

### Event Schema

```javascript
const eventSchema = new Schema(
  {
    eventName: { type: String, required: true, maxlength: 40 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locationName: { type: String, required: true, maxlength: 58 },
    description: { type: String, required: true, maxlength: 3000 },
    eventDate: { type: String, required: true, maxlength: 30 },
    eventTime: { type: String, required: true, maxlength: 30 },
    image: { type: String },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    likedBy: [userLikesSchema],
    eventType: [{ type: String }],
    comments: [commentSchema],
    isDemo: { type: Boolean, required: true },
  },
  { timestamps: true }
)
```

The event model also included two sub-schemas, comment and likes(in the frontend we used likes as RSVP).

```javascript
const commentSchema = new Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 250 },
  },
  { timestamps: true }
)

const userLikesSchema = new Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)
```

### Routes

Using express we created all routes and connected them to their own specific controller functions, routes that require the user to be logged in also needed to go through the `secureRoute` function.

```javascript
const router = express.Router()

router.route('/events').get(getAllEvents).post(secureRoute, createEvent)

router
  .route('/events/:id')
  .get(getSingleEvent)
  .delete(secureRoute, deleteEvent)
  .put(secureRoute, updateEvent)

router.route('/events/:id/likes').put(secureRoute, updateEventLikedBy)

router.route('/events/:id/comments').post(secureRoute, addComment)

router.route('/events/:id/comments/:commentId').delete(secureRoute, deleteComment)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router
  .route('/profile')
  .delete(secureRoute, deleteUser)
  .get(secureRoute, getUserProfile)
  .put(secureRoute, updateProfile)
```

Routes were tested using the Insomnia app.

![Imgur](https://i.imgur.com/5bKg1Dm.png)

## Known Errors or Bugs

- When loading the site, the text color is white instead of black.
- Profile avatars don't stack properly next to the RSVP button.
- Pages are responsive, but need some fine tuning in certain sizes.

### Challenges

- Getting the demo events to populate with a new address.
- Using react-select AsyncSelect to function populate properly.

### Wins

First time working as a team using GitHub. We communicated well, and had minor merge conflicts.

## Key Learnings

- Navigating, accessing, looping and extracting data provided by an api.
- Better understanding of how to communicate with local storage and the JSON format.

## Future Improvements

- The ability to filter events by distance to user location.
- Edit events and user profile. (Our backend already supports these features)
- Update and delete comments.
