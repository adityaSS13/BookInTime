import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useRef, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Navigate } from "react-router-dom";

const TheatreMovieBooking = () => {
    const location = useLocation()
    const theaterData = location.state.theater
    const theaterName = theaterData.name
    const movieData = location.state.movie
    const movie = movieData.title
    const poster = movieData.poster_path
    const descr = movieData.overview
    const options = []
    for(let i=0; i< movieData.timings.length;i++){
        options.push(movieData.timings[i].time)
    }
    const numSeats = [1,2,3,4,5,6]
    const show = useRef(options[0])
    const seats = useRef(1)
    const [movieBooked,setMovieBooked] = useState("")
    const [showTime, setShowTime] = useState("")
    const [theater, setTheater] = useState("")
    const [nseats,setSeats] = useState("")
    const [price, setPrice] = useState("")
    const [edit,setEdit] = useState(true)
    const [showSummary, setShowSumary] = useState(false)
    const authContext = useContext(AuthContext)
    const isLoggedIn = authContext.isLoggedIn
    const proceedSummary = (event) => {
        event.preventDefault()
        // console.log(show.current.value,seats.current.value)
        let tempShow = show.current.value
        let tempSeats = seats.current.value
        setMovieBooked(movie)
        setTheater(theaterName)
        setShowTime(tempShow)
        setSeats(tempSeats)
        setPrice("$" + (10*tempSeats).toString())
        setShowSumary(true)
        setEdit(false)
    }
    const editBooking = (event) => {
        setEdit(event.target.checked)
      }
  return (
    <section>
        {!isLoggedIn && <Navigate to="/auth"/>}
        {isLoggedIn && 
        <>
      <h1 style={{paddingLeft:"1%"}}>Movie Booking</h1>
      <Row>
      <Col xs={12} md={8}>
      <div>
      <Card>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{movie}</Card.Title>
          <Card.Text>{descr}</Card.Text>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Movie Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={movie} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Theater Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theaterName} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Select show time
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={show} disabled={!edit} >
                        {options.map((option) => (
                            <option>{option}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Choose no of seats
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={seats} disabled={!edit}>
                        {numSeats.map((seat) => (
                            <option>{seat}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
        </Card.Body>
        <Card.Footer style={{textAlign:"center"}}>
            <Button onClick={proceedSummary} disabled={!edit}>Proceed to Summary</Button>
        </Card.Footer>
      </Card>
      </div>
      </Col>
      <Col xs={6} md={4}>
      <Card>
        <Card.Body>
          <Card.Title>Booking Summary</Card.Title>
          <Form.Group as={Row} className="mb-3">
                <Form.Label>Movie Chosen</Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={movieBooked} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Theater Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theater} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Show Time
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={showTime} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Number of Seats
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={nseats} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Price for the tickets
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={price} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Edit Booking" value={edit} onChange={editBooking} disabled={!showSummary}/>
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer style={{textAlign:"center"}}>
            <Button disabled={!showSummary}>Proceed to Payment</Button>
        </Card.Footer>
      </Card>
      </Col>
    </Row>
    </>
    }
    </section>
  );
};

export default TheatreMovieBooking;