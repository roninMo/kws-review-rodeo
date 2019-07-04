import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Hub from './hub/Hub';
import Auth from './auth/Auth';
import { BrowserRouter as Router, } from 'react-router-dom';



function App() {
   /**************************
   * Functions 
  **************************/
  const [ sessionToken, setSessionToken ] = useState(''); 
  

  /*************
   * Grab token if localstorage has one
  *************/
  useEffect(() => { // This effect runs upon inital load of the component, updating our session token if we have one saved in it's localStorage
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  /*************
   * Update the token in useState and localstorage when we sign up or login
  *************/
  const updateToken = (newToken) => { // We use this function in a later component to grab the session token after an api call and save it in our sessionToken var and our localStorage
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  /*************
   * Clears token to end session when you logout
  *************/
  const clearToken = () => { // Clears the token we have out of our localStorage
    localStorage.clear();
    setSessionToken('');
  }



  
  const protectedViews = () => {
    return( sessionToken === localStorage.getItem('token') ?
    <React.Fragment>
      <Router>
        <Hub clearToken={clearToken} token={sessionToken} />
      </Router>
    </React.Fragment>
    :
    <React.Fragment>
       <Router>
        <Auth updateToken={updateToken} />
      </Router>
    </React.Fragment>

  )}





  return (
    <div>
      {protectedViews()}
    </div>
  );
}

export default App;
