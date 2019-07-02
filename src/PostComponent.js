import React, {Component} from 'react';
import './Post.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
 class PostComponent extends Component {

    constructor() {
        super();
        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
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
        return(
            <div className="postcontainer">
             <form action={`http://localhost:3000/users/post`} method="post">   
            <div className="postline1">
            <div className="postname">
            <div className="picon" style={{fontSize: '70%'}}>
               <Link className="nav-link" to='/'>
                    <img src={require('./images/learnhigh.jpeg')} style={{color: 'black'}} className="img1" alt="avatar" />
                </Link>
            </div>&nbsp; &nbsp;
               <a href="#">Drafts</a> &nbsp; &nbsp;
               <a href="#">Saved</a>
            </div>
            <div className="posticons">
                {/* <a href="#">&hellip;</a>
                <a href="#" className="fa fa-bell"></a>
                &nbsp; &nbsp; */}
                {/* <div>
                <button onClick={this.showMenu} className="p-circle">p</button>
                {
                    this.state.showMenu
                    ?(
                        <div className="menu">
                            <button>New story</button>
                            <button>Bookmark</button>
                        </div>
                    )
                    : (
                        null
                    )
                }
                </div> */}

            </div>
        </div>
        <div className="postcontainer2">
            <div className="postdes">
                <p>
                    <h2>Story Preview</h2>
                    <textarea typep="text" name="postDescription" rows="13" placeholder="&#10753;  Tell your story..." />
                </p><br></br>
                <p>
                    <h4>Give a title to your story</h4>
                    <input type="text" name="title" placeholder="add a title" />
                </p> <br></br>
                <p>
                    <h4>Give a small description what is your story about</h4>
                    <input type="text" name="titleDescription" placeholder="enter title description" />
                </p> <br></br>
                <p>
                    <h4>give your name so readers know who is you</h4>
                    <input type="text" name="authorName" placeholder="enter author" />
                </p><br></br>
                <p>
                    <h4>Add a time that how much time taken to read your story</h4>
                    <input type="text" name="readTime" placeholder="read time" />
                </p> <br></br> 
                <p>
                    <h4>Add tags so readers know what your story is about</h4>
                    <input type="text" name="tag" placeholder="select a tag" />
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
