import React, {Component} from 'react';
import './Post.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
 class PostComponent extends Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            data: [{
                title: '',
                titleDescription: '',
                subDomain: '',
                readTime: '',
                postDescription: '',
                tag: '',
                userId: ''
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
        // var form = e.target;
        const { title, titleDescription, subDomain, readTime,  postDescription, tag} = this.state;
        const post = {
            title,
            titleDescription,
            subDomain,
            readTime,
            postDescription,
            tag,
            userId: window.localStorage.getItem("userid")
        }; 
        console.log(post)
        var check = window.localStorage.getItem("isLoggedIn");
        if(check === "true" ) {
        axios
            .post('https://medium.learnhigh.ml/users/post',post)
            .then( ()=> this.setState({redirect: true}));
            
            // .then((res) => {
            //     console.log('comment created', res)
            //     let obj = {}
            //     obj.title= res.data.title
            //     obj.titleDescription= res.data.titleDescription
            //     obj.authorName= res.data.authorName
            //     obj.readTime= res.data.readTime
            //     obj.postDescription= res.state.postDescription
            //     obj.tag= res.data.tag
            //     this.setState({
            //         ...this.state,
            //         data: [...this.state.data, obj]
                    
            //     }) 
            // })
            // .catch((e) => {
            //     alert(e)
            // });

            // form.reset('http://localhost:3001');
        } else {
            alert('please sign in first');
        }
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
    }


      render() { 
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{ pathname: '/'}} />
          //  return <Redirect to={{pathname: '/comment',state:{p:this.state.data[0].id}}}/>
        }
        return(
            <div className="postcontainer">
                 <HeaderComponent></HeaderComponent>
             <form onSubmit={this.handleSubmit} method="post">   
            <div className="postline1">
                
            <div className="postname">
            {/* <div className="picon" style={{fontSize: '70%'}}>
               <Link className="nav-link" to='/'>
                    <img src={require('./images/learnhigh.jpeg')} style={{color: 'black'}} className="img1" alt="avatar" />
                </Link>
            </div>&nbsp; &nbsp; */}
               {/* <a href="#">Drafts</a> &nbsp; &nbsp;
               <a href="#">Saved</a> */}
            </div>
            <div className="posticons">

            </div>
        </div>
        <div className="postcontainer2">
            <div className="postdes">
                <p>
                    <h2>Story Preview</h2>
                    <textarea typep="text" name="postDescription" onChange={this.handleCommentdataChange} rows="13" placeholder="&#10753;  Tell your story..." />
                </p><br></br>
                <p>
                    <h4>Give a title to your story</h4>
                    <input type="text" name="title" onChange={this.handleCommentdataChange} placeholder="add a title" />
                </p> <br></br>
                <p>
                    <h4>Give a small description what is your story about</h4>
                    <input type="text" name="titleDescription" onChange={this.handleCommentdataChange} placeholder="enter title description" />
                </p> <br></br>
                <p>
                    <h4>give your name so readers know who is you</h4>
                    <input type="text" name="subDomain" onChange={this.handleCommentdataChange} placeholder="enter subDomain" />
                </p><br></br>
                <p>
                    <h4>Add a time that how much time taken to read your story</h4>
                    <input type="text" name="readTime" onChange={this.handleCommentdataChange} placeholder="read time" />
                </p> <br></br> 
                <p>
                    <h4>Add tags so readers know what your story is about</h4>
                    <input type="text" name="tag" onChange={this.handleCommentdataChange} placeholder="select a tag" />
                </p>
                <p>
                   <input className="submitreplypost" id="submitreplypost" type="submit" value="Publish Now" />
                </p> 
            </div>
        </div> 
        </form>
 
        </div> 
        );
      }
   } 


export default PostComponent;
