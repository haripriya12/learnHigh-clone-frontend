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
                user: {
                    email: "..."
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
        const { commentData, commentBy } = this.state;
        const comment = {
            commentData,
            commentBy
        };
        var check = window.localStorage.getItem("isLoggedIn");
        if(check==="true") {
        axios
            .post(`http://localhost:3000/users/posts/${this.state.id}/comments`, comment)
            .then((res) => {
                console.log('comment created', res)
                let obj = {}
                obj.commentBy= window.localStorage.getItem("userName")
                obj.commentData= res.data.commentData
                obj.createdAt= res.data.createdAt
                this.setState({
                    ...this.state,
                    data: [...this.state.data, obj]
                    
                }) 
            }) 
            .catch((e) => {
                alert(e)
            });

            form.reset();

        } else {
            alert('please sign in first');
        }
    };


    componentWillMount() {
        this.fetch();
    }

    fetch() {
        var url = `http://localhost:3000/users/posts/${this.state.id.toString()}/comments`;

        axios.get(url)
            .then((response) => {
                console.log(response)
                this.setState({
                    data: response.data.data
                });
            }).catch((e) => {
                alert(e)
            });
    }

    render() {
        console.log(this.state,"nnnnnnnnnnn")
      //  var allposts =(comment => <Comment key={this.state.id} comment={comment} />)
      var allposts = this.state.data.map(comment => <Comment key={comment.postid} comment={comment} />);
        return ( 
            <div className="dcontainer">
               <HeaderComponent></HeaderComponent>
                <div className="dline1">
                    <h3>Responses</h3>
                </div>
                {/* <form action={`http://localhost:3000/users/posts/${this.state.id}/comments`} method="post"> */}
                <form onSubmit={this.handleSubmit} method="post">

                    <div className="dline2">
                        <textarea type="text" className="textbox" name="commentData" onChange={this.handleCommentdataChange} type="text" id="mytext" rows="6" cols="55" placeholder="&#128172; Write a response" />

                    </div>
                    <input className="submitreplycom" id="submitreplycom" type="submit" value="Publish Comment" />
                </form>
                <div className="dline3">
                    <h3>Conversation between <span className="dhigh">David Martinz</span> and <span className="dhigh">Dave Feldman.</span></h3>
                </div>
                <div className="dcard1"> 
                    <div className="dprofile">
                        <div className="dimg">
                            <img src={require('./images/david.jpeg')} className="dimagestyle" style={{ borderRadius: "50% 50%" }} alt="avatar" />
                        </div>
                        &nbsp;
                        <div className="dpname">
                            <p><span className="dhigh">David Martinz</span></p>
                            <p>2019-06-30</p>
                        </div>
                    </div>
                    <div className="dmsg">
                        {/* <Post url="https://a0800e21-d9f5-484f-9593-d1a578f990bd.mock.pstmn.io/comment " /> */}

                        <h3>VP Product Design at Heap in San Francisco. Former
                            PM and design manager at Google, Facebook,
                            TechCrunch, Emu, Yahoo. Behavioral science enthusiast.
                            I’m hiring.Indeed! And it’s already improved our speed
                            of execution as a product development team, too. It’s
                            easier and faster to produce consistent UI as we build
                            new functionality
                    </h3>
                    </div>
                    <div className="dreply">
                        <div className="dclaps">
                            <p>&#128079; 1</p>
                        </div>
                        <div className="dresponse">
                            <h3>1 response <i class="far fa-bookmark"></i> </h3>
                        </div>
                    </div>
                </div>
                <div className="none">
                    {allposts}
                </div>
            </div>
           


        );
    }
}


class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render() {
        //console.log(this.props.comment)
        var Date = this.props.comment.createdAt
        Date = Date.slice(0, 10)
        return (
            <div className="d1container">
                
                <div className="dcard2">
                    <div className="dprofile">
                        <div className="img">
                            <img src={require('./images/profile2.png')} className="dimagestyle" style={{ borderRadius: "50% 50%" }} alt="avatar" />
                        </div>
                        &nbsp;
                    <div className="dpname" id="post1">
                            <p><span className="dhigh">{this.props.comment.commentBy}</span></p>
                            {/* {allposts} */}
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
