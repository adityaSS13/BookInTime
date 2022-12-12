import CustomerServiceSearchPageContent from '../components/CustomerService/CustomerServiceSearchPageContent';
import AuthContext from '../contexts/AuthContext';
import { useRef, useState, useContext } from 'react';
import { Alert } from "react-bootstrap";
import classes from '../components/Auth/AuthForm.module.css';

const LoginPage = () => {
    const username = useRef()
    const passwordInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const authContext = useContext(AuthContext)
    // const request = useContext(Request)
    // const isLoggedIn = authContext.isLoggedIn

    const formSubmitted = (event) => {
        event.preventDefault()
        // let data = {
        //     cellphone_no: username.current.value,
        //     password: passwordInp.current.value,
        //     isAdmin: true
        // }
        if(username.current.value === "agent"){
            authContext.login("Abcd")
            setSuccess("Success")
        }else{
            setError("Failed")
        }
        
        // let loginAuth = request.postRequest(constants.REQUEST.EMAIL_LOGIN_EP,data);
        // loginAuth.then(response => {
        //     if(response.ok){
        //         response.json().then((data)=>{
        //             setSuccess("Signin Successful")
        //             authContext.login(data.token)
        //         })
        //     }else{
        //         console.log(response)
        //         response.json().then((err)=>{
        //             setError(err.message)
        //         })
        //     }
        // })
    }
    return (
            <section className={classes.auth}>
            <h1 className={classes.login}>Login</h1>
            { error && <h3><Alert variant="danger">{error}</Alert></h3>}
            { success && 
                <h2>
                    <Alert variant='success'>
                        {success}
                    </Alert>
                </h2> 
            }
            <form onSubmit={formSubmitted.bind(this)}>
                <div className={classes.control}>
                    {/* <label htmlFor='username'>Username</label> */}
                    <input type='text' id='username' required  placeholder="Username" ref={username}/>
                </div>
                <div className={classes.control}>
                    {/* <label htmlFor='password'>Your Password</label> */}
                    <input type='password' id='password' placeholder="Your Password" required ref={passwordInp}/>
                </div>
                <div className={classes.actions}>
                <button style={{ borderRadius: "45px", border: "5px solid black" }}>Login</button>
                </div>
            </form>
            </section>
    )
}




const CustomerServiceSearchPage = () => {
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  return (
    <>
      {isLoggedIn ? <CustomerServiceSearchPageContent /> : <LoginPage/>}
    </>
  );
};

export default CustomerServiceSearchPage;