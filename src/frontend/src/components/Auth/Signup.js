import React from "react";
import classes from "./AuthForm.module.css";
import { Alert } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import Request from "../../contexts/Request";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import constants from "../../constants";
import { useRef, useState, useContext } from "react";

const clientId = constants.CLIENT_ID;

const SignUp = (props) => {
  const firstNameInp = useRef();
  const lastNameInp = useRef();
  const emailUserInp = useRef();
  const passwordInp = useRef();
  const phnoUserInp = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const context = useContext(AuthContext);
  const request = useContext(Request);
  const [isMobileLogin, setMobileLogin] = useState(false);

  const formSubmitted = (event) => {
    event.preventDefault();
    let data = {};
    if (!isMobileLogin) {
      data = {
        first_name: firstNameInp.current.value,
        last_name: lastNameInp.current.value,
        email: emailUserInp.current.value,
        password: passwordInp.current.value,
        usertype: "customer",
        cellphone_no: "",
        isEmail: true,
      };
    } else {
      data = {
        first_name: firstNameInp.current.value,
        last_name: lastNameInp.current.value,
        email: emailUserInp.current.value,
        password: passwordInp.current.value,
        cellphone_no: phnoUserInp.current.value,
        usertype: "customer",
        isEmail: false,
      };
    }
    let signUpReq = request.postRequest(constants.REQUEST.SIGNUP_EP, data);
    signUpReq.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSuccess("Signin Successful");
          context.login(data.token);
        });
      } else {
        response.json().then((err) => {
          setError(err.message);
        });
      }
    });
  };

  const onSuccess = (res) => {
    let googleAuth = request.postRequest(constants.REQUEST.GOOGLE_EP, res);
    googleAuth.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSuccess("Signin Successful");
          context.login(data.token);
        });
      } else {
        console.log(response);
      }
    });
  };

  const onFailure = (res) => {
    console.log(res.error);
  };

  const switchAuthModeHandler = () => {
    props.handleToUpdate(true);
  };

  const mobileLoginHandler = (event) => {
    event.preventDefault();
    if (!isMobileLogin) {
      setMobileLogin(true);
    } else {
      setMobileLogin(false);
    }
  };

  async function facebookLogin() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) {
      console.log(authResponse);
      return;
    } else {
      console.log(authResponse);
      //window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
    }
  }

  return (
    <>
      {context.isLoggedIn && <Navigate to="/" />}
      {!context.isLoggedIn && (
        <div>
          <h1 className={classes.brand}>BookInTime</h1>
          <section className={classes.auth}>
            <h1
              style={{
                fontSize: "35px",
                color: "black",
                backgroundColor: "lightyellow",
                width: "150px",
                marginLeft: "28%",
                borderRadius: "30px",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingBottom: "8px",
                border: "5px solid black",
              }}
            >
              Signup
            </h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <form onSubmit={formSubmitted}>
              <div className={classes.control}>
                <input
                  type="text"
                  id="name"
                  required
                  ref={firstNameInp}
                  placeholder="First Name"
                />
              </div>
              <div className={classes.control}>
                <input
                  type="text"
                  id="lname"
                  required
                  ref={lastNameInp}
                  placeholder="Last Name"
                />
              </div>
              <div className={classes.control}>
                <input
                  type="email"
                  id="email"
                  required
                  ref={emailUserInp}
                  placeholder="Your Email"
                />
              </div>
              {isMobileLogin && (
                <div className={classes.control}>
                  <input
                    type="number"
                    id="phno"
                    required
                    ref={phnoUserInp}
                    placeholder="Your Mobile Number"
                  />
                </div>
              )}
              <div className={classes.control}>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInp}
                  placeholder="Your Password"
                />
              </div>
              <div className={classes.actions}>
                <button
                  style={{ borderRadius: "45px", border: "5px solid black" }}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={mobileLoginHandler}
                >
                  {!isMobileLogin && <>Signup With Mobile Number</>}
                  {isMobileLogin && <>Signup With Email</>}
                </button>
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  Login with existing account
                </button>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Google Sign Up"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={false}
                />
                <button className="btn btn-facebook" onClick={facebookLogin}>
                  <i className="fa fa-facebook mr-1"></i>
                  Signup with Facebook
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default SignUp;
