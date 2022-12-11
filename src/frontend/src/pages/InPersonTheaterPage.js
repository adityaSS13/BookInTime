import '@coreui/coreui/dist/css/coreui.min.css'
import AuthContext from '../contexts/AuthContext';
import Request from '../contexts/Request';
import { useRef, useState, useContext, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import loginClasses from '../components/Auth/AuthForm.module.css';
import background from "./theat.jpg";
import constants from "./../constants";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import React from "react";
import classes from "./../components/StartingPage/StartingPageContent.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const username = useRef()
    const passwordInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const authContext = useContext(AuthContext)
    const request = useContext(Request)
    // const isLoggedIn = authContext.isLoggedIn

    useEffect(() => {
        const loginToken = localStorage.getItem(constants.AUTH_TOKEN_KEY_ADHOC);
        if (loginToken) {
          let testToken = request.getRequest("/testAdhoc", { token: loginToken });
          testToken.then((response) => {
            if (response.ok) {
              authContext.login(loginToken);
            } else {
              localStorage.removeItem(constants.AUTH_TOKEN_KEY_ADHOC);
            }
          });
        }
        // eslint-disable-next-line
      }, []);
    const formSubmitted = (event) => {
        event.preventDefault()
        let data = {
            email: username.current.value,
            password: passwordInp.current.value,
            isEmail: true
        }
        let loginAuth = request.postRequest(constants.REQUEST.EMAIL_LOGIN_EP,data);
        loginAuth.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                    setSuccess("Signin Successful")
                    authContext.login(data.token)
                })
            }else{
                console.log(response)
                response.json().then((err)=>{
                    setError(err.message)
                })
            }
        })
    }
    return (
            <section className={loginClasses.auth}>
                <h1 className={loginClasses.login}>Login</h1>
                { error && <h3><Alert variant="danger">{error}</Alert></h3>}
                { success && 
                    <h2>
                        <Alert variant='success'>
                            {success}
                        </Alert>
                    </h2> 
                }
                <form onSubmit={formSubmitted.bind(this)}>
                    <div className={loginClasses.control}>
                        <input type='text' id='username' required  placeholder="Theater Email Id" ref={username}/>
                    </div>
                    <div className={loginClasses.control}>
                        <input type='password' id='password' placeholder="Password" required ref={passwordInp}/>
                    </div>
                    <div className={loginClasses.actions}>
                    <button style={{ borderRadius: "45px", border: "5px solid black" }}>Login</button>
                    </div>
                </form>
            </section>
    )
}


const InPersonTheaterPage = () => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  const request = useContext(Request)
  const [theater,setTheater] = useState()
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn){
        let getMovies = request.getRequest(constants.REQUEST.ADHOC_MOVIES);
        getMovies.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                    setTheater(data.theaterobject)
                    console.log(data)
                    let getMovies = request.getRequest(constants.REQUEST.THEATERS_MOVIES, {
                        theaterId: data.theaterobject._id,
                    });
                    getMovies.then((response) => {
                        if (response.ok) {
                            response.json().then((data) => {
                                // console.log(data.moviesList)
                                setMovies(data.moviesList)
                            });
                        } else {
                            console.log(response);
                        }
                    });
                })
            }else{
                console.log(response)
            }
        });
      }
  },[isLoggedIn])

  const bookMovieHandler = (event, movie) => {
    navigate("/adhocmovie", { state: { movie: movie, theater: theater} });
  };
  return (
    <>
    {!isLoggedIn && 
      <div className={loginClasses.bg}>
          <div style={{ backgroundImage: `url(${background})`}} className={loginClasses.bgimg}>
            <LoginPage/>
          </div>
      </div>
    }
    {isLoggedIn && 
    <section style={{ backgroundColor: "#00004d", marginTop: "0px" }} className={classes.starting}>
      <div className={classes.adhocTitle}>
        {theater && <h3>Welcome to {theater.name}</h3>}
      </div>
      <Row xs={1} md={4} className="g-4">
        {movies.map((movie) => (
          <React.Fragment key={movie.title}>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.poster_path.endsWith("null") ? "backup_poster.svg": movie.poster_path }
                  width="300"
                  height="300"
                  style={{backgroundColor:"antiquewhite"}}
                />
                <Card.Body
                  style={{
                    minHeight: "150px",
                    maxHeight: "150px",
                    overflowY: "scroll",
                  }}
                >
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={(event) => bookMovieHandler(event, movie)}>
                    Book Movie
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </section>}
    </>
  )
};

export default InPersonTheaterPage;