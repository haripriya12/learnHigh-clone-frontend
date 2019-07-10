import React, { Component } from 'react';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import DataComponent from './DataComponent';
import PageComponent from './PageComponent';
import PostComponent from './PostComponent';
import SignupComponent from './SignupComponent';


class App extends Component {

  componentDidMount() {
    // this.fetch();
     var userName = window.localStorage.getItem("isLoggedIn");
     if(userName === "true" || userName !== null ) {
       document.getElementById('Signin').innerHTML = "Sign out"
       document.getElementById("welcome").innerHTML= "Welcome"+ " "+ window.localStorage.getItem("userName");
     } else {
       document.getElementById('Signin').innerHTML = "Sign in"
       document.getElementById("welcome").style.display="none"
     }
    
   }


  render() {
    return (
      <Router>
        <div>
          {/* <HomeComponent></HomeComponent> */}
          <Switch> 
          <Route exact path='/' component={HomeComponent}></Route>
          {/* <Route exact path='/tag' component={HomeComponent}></Route> */}
          <Route exact path='/login' component={LoginComponent}></Route>
          <Route exact path='/signup' component={SignupComponent}></Route>
          <Route exact path='/post' component={PostComponent}></Route>
          <Route exact path='/comment' render={(p) => <DataComponent post={p} />}/>
          {/* <Route exact path='/comment/:ID' component={DataComponent}></Route> */}
          <Route exact path='/singlepage'
            render={(p) => <PageComponent post={p} />}/>  
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
