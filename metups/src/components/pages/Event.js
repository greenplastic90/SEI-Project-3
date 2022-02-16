import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { mapToken } from "../../config/enviroments.js";

// Import helpers
import { getTokenFromLocalStorage } from "../../auth/helpers";

// Import Bootstrap Components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { Heart } from "react-bootstrap-icons";

const SingleEvent = ({ user, userGeoLocation }) => {
  const [event, setEvent] = useState("");
  const [hasError, setHasError] = useState({ error: false, message: "" });
  const [hasLiked, setHasLiked] = useState(null);
  const [comments, setComments] = useState({
    owner: "",
    text: ""
  });

  const [likedBy, setLikedBy] = useState([]);

  const { id } = useParams();

  // EVENTS API
  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setLikedBy(data.likedBy);
        setEvent(data);
        console.log("CHECKING ->", user._id);
      } catch (err) {
        setHasError({ error: true, message: err.message });
      }
    };
    getSingleEvent();
  }, [id]);

  // LIKES API
  const handleLikes = async (e) => {
    e.preventDefault();
    const hasLiked = likedBy.some((like) => user._id === like.owner._id);
    console.log(hasLiked);
    const updatedLikedByArray = likedBy;
    if (hasLiked) {
      updatedLikedByArray.forEach((like, i) => {
        if (user._id === like.owner._id) {
          updatedLikedByArray.splice(i, 1);
          console.log("REMOVED FROM ARRAY ->", updatedLikedByArray);
        }
      });
    }
    if (!hasLiked) {
      updatedLikedByArray.push({ owner: user });
      console.log("ADDED TO ARRAY ->", updatedLikedByArray);
    }
    try {
      await axios.put(
        `/api/events/${id}/likes`,
        { likedBy: updatedLikedByArray },
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      );
      const getSingleEvent = async () => {
        try {
          const { data } = await axios.get(`/api/events/${id}`);
          setEvent(data);
        } catch (err) {
          setHasError({ error: true, message: err.message });
        }
      };
      getSingleEvent();
    } catch (err) {
      console.log(err.response);
    }
  };

  // HANDLECHANGE AND SUBMIT FOR COMMENT
  const handleChange = (e) => {
    if (e.target) {
      const newObj = { ...comments, [e.target.name]: e.target.value };
      setComments(newObj);
    } else {
      console.log(e);
      const arrayOfValues = e.map((comments) => {
        return comments.owner.username;
      });
      console.log(arrayOfValues);
      const newValue = { ...comments, text: arrayOfValues };
      setComments(newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/events/${id}/comments`,
        comments,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        }
      );
      const getSingleEvent = async () => {
        try {
          const { data } = await axios.get(`/api/events/${id}`);
          setEvent(data);
        } catch (err) {
          setHasError({ error: true, message: err.message });
        }
      };
      getSingleEvent();
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <section>
        {event ? (
          <Container className="mt-5 mx-9000">
            <Row className="my-5">
              {/* EVENT IMAGE AND EVENT NAME*/}
              <div>
                <Image
                  className="img-fluid shadow-2-strong"
                  src={event.image}
                  alt="event image"
                />
              </div>
            </Row>
            {event.owner ? (
              <Row className="justify-content-md-center">
                <Col>
                  {/*  HOSTED BY */}
                  <div>
                    <Image
                      src={event.owner.profilePhoto}
                      alt="host's profile image"
                      className="rounded-circle my-2 mx-5"
                    />
                  </div>
                </Col>

                <Col className="mt-5">
                  <p> Hosted by: {event.owner.username} </p>
                </Col>
                <Col xs lg="6" className="mt-9">
                  <div>
                    <h1> {event.eventName} </h1>
                    <p>{event.eventType} Event </p>
                  </div>

                  <div>
                    {/* LIKE BUTTON */}
                    {likedBy.length && user ? (
                      likedBy.some((like) => {
                        console.log(user);
                        return user._id === like.owner.id;
                      }) ? (
                        <Button
                          variant="primary"
                          className="my-3"
                          onClick={handleLikes}
                        >
                          <Heart /> Unlike
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          className="m-2"
                          onClick={handleLikes}
                        >
                          <Heart /> Like
                        </Button>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            ) : (
              <Spinner animation="border"></Spinner>
            )}

            {/* description + date and time */}
            <Row>
              <Col className="mt-8">
                <div>
                  <p>{event.description}</p>
                </div>
              </Col>
              <Col>
                <div>
                  <div>Event Location: {event.locationName}</div>
                  <div>Date: {event.eventDate}</div>
                  <div>Time: {event.eventTime}</div>
                </div>
                {userGeoLocation && (
                  <>
                    <div>
                      <Map
                        initialViewState={{
                          longitude: event.longitude,
                          latitude: event.latitude,
                          zoom: 9
                        }}
                        style={{ height: 300 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken={mapToken}
                      >
                        <Marker
                          color="green"
                          longitude={event.longitude}
                          latitude={event.latitude}
                        ></Marker>
                      </Map>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            {/* COMMENTS DISPLAY */}
            <Row>
              <hr />
              <Col className="my-4">
                <h2> Comments </h2>
              </Col>
            </Row>

            {!event.comments.length ? (
              <></>
            ) : (
              <Row>
                {event.comments.map((comment) => {
                  return (
                    <Row>
                      <Card border="light" style={{ width: "60rem" }}>
                        <Card.Header>
                          <Image
                            src={comment.owner.profilePhoto}
                            className="comment-profilePhoto rounded-circle my-2 mx-3"
                          />
                          {comment.owner.username}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>{comment.text}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Row>
                  );
                })}
              </Row>
            )}

            {/* ADD COMMENT */}
            <hr />
            <Row>
              <Col>
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        name="text"
                        as="textarea"
                        onChange={handleChange}
                        placeholder="add comment here"
                      />
                    </Form.Group>
                    <Form.Group className="mt-4 text-center">
                      <Button name="text" type="submit">
                        Post Comment
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <div>loading</div>
        )}
      </section>
    </>
  );
};

export default SingleEvent;
