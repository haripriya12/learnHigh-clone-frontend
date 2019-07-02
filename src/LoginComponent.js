import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
 class LoginComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

      render() {
        return(
            <div className="lcontainer"> 
        <div className="logcontainer3">
            <h1>Sign in with email</h1>
            <div className="data1">
                <h4>Sign in to get personalized story recommendations, follow authors and 
                    topics you love, and interact with stories.
                </h4>
            </div>
            <div className="mail">
                <p>Your email</p>
                <form action={`http://localhost:3000/users/signin`} method="post">
                <p>
                <input type="logintext" id="email" name="email" pattern=".+@gmail.com" required placeholder="sign in with your email" />
                </p>
                <p>
                <input type="logintext" id="password" name="password" minLength="4" maxLength="8" required placeholder="enter password" />
                </p>
                <p>
                    {/* <Link className="nav-link" to="/"> */}
                    <input className="userlogin" id="userlogin" type="submit" value="CONTINUE" />
                    {/* </Link> */}
                </p> 
               </form>
            </div>
            <div className="Noaccount">
                <p>No Account  ?  </p> 
                &nbsp; 
                <Link className="nav-link" to='/signup'>
                <p style={{color: 'blue'}}>Create One</p>
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


export default LoginComponent;
