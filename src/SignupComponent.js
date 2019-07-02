import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
//   import SigninInComponent from './SigninInComponent';
 class SignupComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

      render() {
        return(
            <div className="lcontainer">
        <div className="logcontainer3">
            <h1>Join Medium.</h1>
            <div className="data1">
                <h3>Create an account to receive great stories in your inbox,
                    personalize your homepage, and follow authors and topics 
                    that you love.
                </h3>
            </div>
            <div className="mail">
                <p>Your email</p>
                <form action={`http://localhost:3000/users/signup`} method="post">
                <p>
                <input type="logintext" id="email" name="email" pattern=".+@gmail.com" required placeholder="sign in with your email" />
                </p>
                <p>
                <input type="logintext" id="password" name="password" minLength="4" maxLength="8" placeholder="enter password" />
                </p>
                <p>
                    <input className="userlogin" id="userlogin" type="submit" value="Sign Up" />
                </p> 
                </form> 
            </div>
            <div className="Noaccount">
                <p>Already have Account  ?  </p> 
                &nbsp; 
                <Link className="nav-link" to='/login'>
                <p style={{color: 'blue'}}>Sign in</p>
                </Link>
            </div>
            <div className="fylo">
                <p className="style">&#8592; All sign in option 
                </p>
            </div>
        </div>
        </div>
        );
      }
   }


export default SignupComponent;
