import React, { Component } from 'react';
import './data.css';
import axios from 'axios';
// import { Redirect } from 'react-router';
import HeaderComponent from './HeaderComponent';
class DataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.post.location.state.p,
            data: [{
                commentBy: "...",
                commentData: "...",
                createdAt: "...",
                userId: '',
                user: {
                    email: "...",
                    userName: "...",
                    image: "..."
                }
            }]
        };
    }

    handleCommentdataChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    handleSubmit = e =>{
        e.preventDefault();
        var form = e.target;
        // this.data.append(this.state.comment)
        const { commentData } = this.state;
        const comment = {
            commentData,
            userId: window.localStorage.getItem("userid")

        };
        var check = window.localStorage.getItem("isLoggedIn");
        if(check==="true") {
        axios
            .post(`https://medium.learnhigh.ml/users/posts/${this.state.id}/comments`, comment)
            .then((res) => {
                let obj = {}
                obj.user = {}
                obj.user.commentBy= window.localStorage.getItem("userName")
                obj.user.image= window.localStorage.getItem("image")
                obj.commentData= res.data.commentData
                obj.createdAt= res.data.createdAt
                this.setState({
                    data: [...[obj]]
                })
            }) 
            .catch((e) => {
                console.error(e)
            });

            form.reset();

        } else {
            alert('please sign in before add comment');
        }
    };


    componentWillMount() {
        this.fetch();
    }

    fetch() {
        var url = `https://medium.learnhigh.ml/users/posts/${this.state.id.toString()}/comments`;

        axios.get(url)
            .then((response) => {
                // console.log(response)
                this.setState({
                    data: response.data.data
                });
            }).catch((e) => {
                alert(e)
            });
    }

    render() {
        console.log(this.state, 'inside render')
      //  var allposts =(comment => <Comment key={this.state.id} comment={comment} />)
      var allposts = this.state.data.map(comment => <Comment key={comment.postid} comment={comment} />);
        return ( 
            <div className="dcontainer">
               <HeaderComponent></HeaderComponent>
                <div className="dline1">
                    <h3>Responses</h3>
                </div>

                <form onSubmit={this.handleSubmit} method="post">

                    <div className="dline2">
                        <textarea type="text" className="textbox" name="commentData" onChange={this.handleCommentdataChange} type="text" id="mytext" rows="6" cols="55" placeholder="&#128172; Write a response" />

                    </div>
                    <input className="submitreplycom" id="submitreplycom" type="submit" value="Publish Commenconsole.log('comment created', res)t" />
                </form>
                <div className="dline3">
                    <h3>Conversations......</h3>
                </div>
                <div className="dcard1"> 
                    {/* <div className="dprofile">
                        <div className="dimg">
                            <img src={require('./images/david.jpeg')} className="dimagestyle" style={{ borderRadius: "50% 50%" }} alt="avatar" />
                        </div>
                        &nbsp;
                        <div className="dpname">
                            <p><span className="dhigh">David Martinz</span></p>
                            <p>2019-06-30</p>
                        </div>
                    </div> */}
                    {/* <div className="dmsg">
                        <h3>VP Product Design at Heap in San Francisco. Former
                            PM and design manager at Google, Facebook,
                            TechCrunch, Emu, Yahoo. Behavioral science enthusiast.
                            I’m hiring.Indeed! And it’s already improved our speed
                            of execution as a product development team, too. It’s
                            easier and faster to produce consistent UI as we build
                            new functionality
                    </h3>
                    </div> */}
                </div>
                <div className="none">
                    
                    {allposts}
                </div>
            </div>
           


        );
    }
}


class Comment extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: [{
    //             commentBy: "...",
    //             commentData: "...",
    //             createdAt: "...",
    //             userId: '',
    //             user: {
    //                 email: "...",
    //                 userName: "...",
    //                 image: "..."
    //             }
    //         }]

    //     }
    // }

    render() {
        var Date = this.props.comment.createdAt
        Date = Date.slice(0, 10)
        // console.log(this.props.comment,"................")
        // console.log(this.props.comment.user.userName,"................")
        return (
            <div className="d1container">
                
                <div className="dcard2">
                    <div className="dprofile">
                        <div className="img">
                            <img src={this.props.comment.user.image} className="dimagestyle" style={{ borderRadius: "50% 50%" }} alt="no image available" />
                        </div>
                        &nbsp;
                    <div className="dpname" id="post1">
                            <p><span className="dhigh">{this.props.comment.user.userName}</span></p>
                            <p>{Date}</p>
                        </div>
                    </div>
                    <div className="dmsg">
                        <h3>{this.props.comment.commentData}</h3>
                    </div>
                    <div className="dreply">
                        <div className="dclaps">
                            <p>&#128079;</p>
                        </div>
                        <div className="dresponse">
                            <i class="far fa-bookmark"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DataComponent;
