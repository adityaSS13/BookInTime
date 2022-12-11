import React, { useState } from "react"
import { useNavigate } from "react-router"
import constants from "../constants"

const AuthContext = React.createContext({
  token:"",
  isLoggedIn : false,
  login:(token)=>{},
  logout:()=>{},
  location:"",
  updateLocation:(value)=>{},
  setBookingDetails : (value)=>{},
  getBookingDetails : (value)=>{}
})

export const AuthContextProvider = (props)=>{
  const [token,setToken] = useState(null)
  const [location,setLocation] = useState("Bloomington")
  const [isLoggedIn,setLoginState] = useState(false)

  const navigate = useNavigate();

  // if(!token){
  //   setLoginState(false)
  // }

  // const isLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token)
    setLoginState(true)
    if(window.location.pathname.startsWith("/adhoc")){
      window.localStorage.setItem(constants.AUTH_TOKEN_KEY_ADHOC,token)
    }else if(window.location.pathname.startsWith("/admin")){
      window.localStorage.setItem(constants.AUTH_TOKEN_KEY_ADMIN,token)
    }else{
      window.localStorage.setItem(constants.AUTH_TOKEN_KEY,token)
    }
  }

  const logoutHandler = () => {
    setToken(null)
    setLoginState(false)
    if(window.location.pathname.startsWith("/adhoc")){
      window.localStorage.removeItem(constants.AUTH_TOKEN_KEY_ADHOC)
      navigate("/adhoc")
    }else if(window.location.pathname.startsWith("/admin")){
      window.localStorage.removeItem(constants.AUTH_TOKEN_KEY_ADMIN)
      navigate("/admin")
    }else{
      window.localStorage.removeItem(constants.AUTH_TOKEN_KEY)
      navigate("/")
    }
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
  }

  const updateLocation = (value) => {
    setLocation(value)
    navigate("/")
  }

  const setBooking = (value) => {
    localStorage.setItem("transaction",JSON.stringify(value));
  }
  const getBooking = (value) => {
    return JSON.parse(localStorage.getItem("transaction"));
  }

  const context = {
    token : token,
    isLoggedIn : isLoggedIn,
    location: location,
    login : loginHandler,
    logout : logoutHandler,
    updateLocation : updateLocation,
    setBookingDetails : setBooking,
    getBookingDetails : getBooking
  }
  // console.log(props)
  return (<AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>)
}

export default AuthContext