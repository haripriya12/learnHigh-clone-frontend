import React, { Component } from 'react';
import './page5.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';
class PageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.post.location.state.p,
            data: [{
                title: "...",
                titleDescription: "...",
                authorName: "...",
                postDescription: "...",
                createdAt: "..."
            }]
        }
    } 

    componentWillMount() {
        this.fetch();
    }

    fetch() {
        var url = "http://localhost:3000/users/posts/" + this.state.id.toString();

        // alert(url)

        axios.get(url)
            .then((response) => {
                //console.log(response)
                this.setState({
                    //id: response.data.data.id,
                   data: response.data.data
                    //title: response.data.data.title
                });
                console.log(this.state.data[0])
            }).catch((e) => {
                alert(e)
            });
    }




    render() {
        var publishdate = this.state.data[0].createdAt;
        publishdate = publishdate.slice(0, 10); 
        // console.log(this.props.post.location.state.p)
        // console.log(this.state)
       // var allposts = this.state.data.map(post => <Post key={post.id} post={post} />);
        return (
            <div className="pcontainer">
                <div className="pfirst">
                    <div className="pleftside">
                    <div className="picon" style={{fontSize: '270%'}}>
                        <Link to='/'>
                            <img src={require('./images/learnhigh.jpeg')} className="img1" alt="avatar" />
                        </Link>
                        </div>            
                        <div className="pname">
                            <h1>{this.state.data[0].tag}</h1>
                        </div>
                    </div> 
                </div>
                <div className="pline2">
                    <h1>{this.state.data[0].title}</h1>
                </div>
                <div className="psecond">
                        <div className="pb1">
                            <h1>Case Study: {this.state.data[0].title}</h1>
                        </div>
                        <div className="pb2">
                            {this.state.data[0].titleDescription}
                        </div> <br></br>
                        <div className="profilepage"> 
                             <img src={require('./images/david.jpeg')} className="pimagestyle" alt="avatar" />
                            <div className="pagename" id="post1">
                            <div className="ppname" id="post1">
                            <Link className="nav-link" to={{pathname:'/comment', state: {p:this.state.data[0].id}}}>
                                 <h3>{this.state.data[0].authorName}</h3>
                            </Link>
                            </div>
                            <p>{publishdate} . {this.state.data[0].readTime}</p>
                            </div>
                        </div>
                    
                </div> <br />
                <div className="pthird">
                    <div className="p">
                       {this.state.data[0].postDescription}
                    </div>
                </div>
                <div className="viewRes">
                <Link className="nav-link" to={{pathname:'/comment', state: {p:this.state.data[0].id}}}>
                    <input className="submitreply" id="submitreply" type="submit" value="show the responses" />
                </Link>
                </div>
            </div>
        );
    }
}
  
// class Post extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         var publishdate = this.props.post.createdAt;
//         publishdate = publishdate.slice(0, 10);
//         return (
//             <div class="pcontainer">
//                 <div className="profilepage">
//                     <img src={require('./images/david.jpeg')} className="pimagestyle" alt="avatar" />
//                     <div className="dp">
//                     <div className="ppname" id="post1">
//                     <Link className="nav-link" to={{pathname:'/comment', state: {p:this.props.post.id}}}>
//                         <h3>{this.props.post.authorName}</h3>
//                     </Link>
//                     </div>
//                 <div>
//                     <h4>{publishdate} . {this.props.post.readTime}</h4>
//                 </div>
//                 </div>
//                 </div>
//             </div>
//         );
//     }
// }


export default PageComponent;

