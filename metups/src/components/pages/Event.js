import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import helpers
// import { getPayload, getTokenFromLocalStorage } from "../../auth/helpers";

// Import Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from 'react-bootstrap/Spinner'

const SingleEvent = () => {
  const [event, setEvent] = useState("");
  const [hasError, setHasError] = useState({ error: false, message: "" });

  const { id } = useParams();
  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        console.log("SINGLE EVENT DATA HERE ->", data);
        setEvent(data);
      } catch (err) {
        setHasError({ error: true, message: err.message });
      }
    };
    getSingleEvent();
  }, [id]);

  return (
    <>   
    <section>
    <Container className="mt-5">
      {/* image container */}
      <div>
        <Image
          className="img-fluid shadow-2-strong"
          src={event.image}
          alt="event image"
          responsive
        />
      </div>


      {event.owner ?
      <Row>
        <Col>
          <div>
            <p> Hosted by: {event.owner.username} </p>
            <Image src={event.owner.profilePhoto} alt="host's profile image" responsive/>
          </div>
        </Col>
        <Col>
          <div>
            <h2> {event.eventName} </h2>
            <Button variant="danger"> Like </Button>
          </div>
        </Col>
      </Row> 

      :<Spinner animation='border'> </Spinner>
      }

      {/* description + date and time */}
      <Row>
        <Col>
          <div>
            <p>{event.description}</p>
          </div>
        </Col>
        <Col>
          <div>
            <div>Type of event: {event.eventType}</div>
            <div>Event Location: {event.locationName}</div>
            <div>Date: {event.eventDate}</div>
            <div>Time: {event.eventTime}</div>
          </div>
        </Col>
      </Row>

      {/* comments section */}

      
    </Container>
    </section>
    </>
  );
};

export default SingleEvent;
