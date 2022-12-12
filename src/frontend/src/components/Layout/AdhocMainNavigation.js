import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import classes from './MainNavigation.module.css';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// import { useContext, useCallback, useEffect, useState,useRef } from 'react';
import { useContext } from 'react';
// import Request from '../../contexts/Request';
// import constants from '../../constants';
// import {useLocation} from 'react-router-dom';

const AdhocMainNavigation = () => {
  const ctxt = useContext(AuthContext)
  
  const handleLogout = () => {
    ctxt.logout()
  }

  return (
    <header className={classes.header}>
      <div style={{display:"flex", paddingLeft:"15px"}}>
        <div className={classes.title}>BookInTime</div>
      </div>
      <div style={{display:"flex", alignItems:"center"}}>
        <nav className={classes.navList}>
          <ul>
            {ctxt.isLoggedIn && (
              <li>
                <Link to="/adhoc">Movie</Link>
              </li>
            )}
            {!ctxt.isLoggedIn && 
              (
                <li>
                  <Link to='/adhoc'>Login</Link>
                </li>
              )
            }
            {ctxt.isLoggedIn && 
              (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdhocMainNavigation;
