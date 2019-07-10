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
//   import SigninInComponent from './SigninInComponent';
 class SignupComponent extends Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            data: [{
                userName: '',
                email: '',
                password: '',
                image: ''    
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
        const { userName, email, password, image } = this.state;
        const post = {
            userName,
            email,
            password,
            image
        }; 

        axios
            .post('https://medium.learnhigh.ml/users/signup',post)
            .then((res) => {
                console.log('comment created', res)
                let obj = {}
                obj.userName= res.data.userName
                obj.email= res.data.email
                obj.password= res.data.password
                obj.image= res.data.image
                this.setState({
                    ...this.state,
                    data: [...this.state.data, obj]
                    
                }) 
            }) .then( ()=> this.setState({redirect: true}))
            .catch((e) => {
                alert(e)
            });
    }

      render() {
           const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{ pathname: '/login'}} />
          //  return <Redirect to={{pathname: '/comment',state:{p:this.state.data[0].id}}}/>
        }
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
                {/* <form action={`http://localhost:3000/users/signup`} method="post"> */}
                <form onSubmit={this.handleSubmit} method="post">
                <p>
                <input type="logintext" id="Username"  onChange={this.handleCommentdataChange} name="userName" required placeholder="Enter Username" />
                </p>
                <p>
                <input type="logintext" id="email"  onChange={this.handleCommentdataChange} name="email" pattern=".+@gmail.com" required placeholder="sign in with your email" />
                </p>
                <p>
                <input type="logintext" id="password"  onChange={this.handleCommentdataChange} name="password" minLength="4" maxLength="19" placeholder="enter password" />
                </p>
                <p>
                <input type="logintext" id="image"  onChange={this.handleCommentdataChange} name="image" placeholder="upload image" />
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
