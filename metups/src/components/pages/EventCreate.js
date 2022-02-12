import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { getTokenFromLocalStorage } from '../../auth/helpers'


import { useNavigate } from "react-router-dom";
import { cloudinaryURL, uploadPreset } from "../../config/enviroments.js";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EventCreate = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: [],
    description: "",
    locationName: "",
    latitude: 1,
    longitude: 1,
    map: "",
    eventDate: "",
    eventTime: "",
    image: "",
  });

  const [formErrors, setFormErrors] = useState("");

  const handleChange = (e) => {
    if (e.target) {
      const newObj = { ...formData, [e.target.name]: e.target.value };
      setFormData(newObj);
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    } else {
      console.log(e);
      const arrayOfValues = e.map((obj) => {
        return obj.label;
      });
      console.log(arrayOfValues);
      const newValue = { ...formData, eventType: arrayOfValues };
      setFormData(newValue);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } =  await axios.post("/api/events/", formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      });
      navigate(`/events/${data._id}`);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handelImageUpload = async (e) => {
    try {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", uploadPreset);
      const res = await axios.post(cloudinaryURL, data);
      console.log(res.data.url);
      setFormData({ ...formData, image: res.data.url });
    } catch (err) {
      console.log(err);
    }
  };

  // --- Event Types ----
  const options = [
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "outdoor", label: "Outdoor" },
    { value: "workshop", label: "Workshop" },
    { value: "class", label: "Class" },
    { value: "tech", label: "Tech" },
    { value: "craft", label: "Craft" },
    { value: "art", label: "Art" },
    { value: "party", label: "Party" },
    { value: "culture", label: "Culture" },
    { value: "food", label: "Food" },
    { value: "history", label: "History" },
    { value: "philosophy", label: "Philosophy" },
  ];
  // --------------------

  return (
    <section>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          {/* eventName */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="eventName">Event Name</Form.Label>
            <Form.Control name="eventName" type="eventName" placeholder="Event Name" onChange={handleChange} />
            <Form.Text className="text-muted">
              Add the name of your event here
            </Form.Text>
          </Form.Group>

          {/* type  */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="eventType">Type of Event</Form.Label>
            <Select closeMenuOnSelect={false} defaultValue={formData.eventType} isMulti options={options} name="eventType" onChange={handleChange} />
            <Form.Text className="text-muted">
              Add the type of event you're hosting
            </Form.Text>
          </Form.Group>

          {/* description */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control as="textarea" name="description" onChange={handleChange} />
            <Form.Text className="text-muted">
              Add a description for your event
            </Form.Text>
          </Form.Group>

          {/* Location Name */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="location">Location</Form.Label>
            <Form.Control name="locationName" type="locationName"placeholder="Location" onChange={handleChange} />
            <Form.Text className="text-muted">
              Add the location of your event
            </Form.Text>
          </Form.Group>

          {/* map */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="map">ADD MAP HERE</Form.Label>
            <Form.Control type="map" placeholder="map" />
          </Form.Group>

          {/* eventDate */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="eventDate">Date</Form.Label>
            <Form.Control type="date" name="eventDate" onChange={handleChange} placeholder="eventDate" />
            <Form.Text className="text-muted">
              Add the date on which your event will take place
            </Form.Text>
          </Form.Group>

          {/* eventTime */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="eventTime">Time</Form.Label>
            <Form.Control type="Time" name="eventTime" placeholder="eventTime" onChange={handleChange} />
            <Form.Text className="text-muted">
              Add the time at which your event will take place
            </Form.Text>
          </Form.Group>

          {/* Upload Image */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="image">Add Image</Form.Label>
            <Form.Control onChange={handelImageUpload} type="file" name="image" defaultValue={formData.image} />
            <Form.Text className="text-muted"> Add an image banner for your event! </Form.Text>
          </Form.Group>

          <Form.Group className="mt-4 text-center">
            <Button type="submit">Create Event</Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  );
};

export default EventCreate
