import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router';
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
            redirect: false,
            data: [{
                email: '',
                password: ''    
            }]

        }
    }

    handleCommentdataChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    handleSubmit = e =>{
        e.preventDefault();
        const { email, password } = this.state; 
        const post = {
            email,
            password
        }; 

        axios
            .post('https://medium.learnhigh.ml/users/signin',post)
            .then((res) => {
                console.log('comment created', res.data)
                if(res.data.length == 0) {
                    alert('Enter correct email and passsword');
                    window.localStorage.setItem("isLoggedIn",false)
                } else {
                    this.setState({redirect: true})
                    window.localStorage.setItem("isLoggedIn",true)
                    window.localStorage.setItem("userName",res.data[0].userName)
                    window.localStorage.setItem("userid",res.data[0].id)
                    window.localStorage.setItem("image",res.data[0].image)
                }
            });
    }


      render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{ pathname: '/'}} />
          //  return <Redirect to={{pathname: '/comment',state:{p:this.state.data[0].id}}}/>
        }
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
                <form onSubmit={this.handleSubmit} method="post">
                <p>
                <input type="logintext" id="email" onChange={this.handleCommentdataChange} name="email" pattern=".+@gmail.com" required placeholder="sign in with your email" />
                </p>
                <p>
                <input type="logintext" id="password" onChange={this.handleCommentdataChange} name="password" minLength="4" maxLength="8" required placeholder="enter password" />
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
