import React, { Component } from 'react';
import './data.css';
import axios from 'axios';
import { Redirect } from 'react-router';
// import david from './david.jpeg'
// import images from './images'
class DataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.post.location.state.p,
            commentdata: '',
            redirect:false,
            // authorName: this.props.post.location.state.p,
            data: [{
                commentedby: "...",
                commentdata: "...",
                createdAt: "..."
            }]
        };
        console.log('cccc',this.state.commentdata)
        this.handleCommentdataChange = this.handleCommentdataChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    handleCommentdataChange(event) {
        this.setState({commentdata: event.target.value})
    }

    handleSubmit(event)
    {
        event.preventDefault();
        axios.post(`http://localhost:3000/users/posts/${this.state.id}/comments`,{...this.state})
        .then( ()=> this.setState({redirect: true}));
    }

    componentWillMount() {
        this.fetch();
    }

    fetch() {
        var url = `http://localhost:3000/users/posts/${this.state.id.toString()}/comments`;
        // var url1 = "http://localhost:3000/users/posts";
       
        //alert(url)

        axios.get(url)
            .then((response) => {
                console.log(response)
                this.setState({
                    data: response.data.data
                });
                console.log('mmm',this.state.data[0])
            }).catch((e) => {
                alert(e)
            });
    }
 

    render() {
        console.log('nhscnx',this.state.id)
        console.log('harii',this.state.data[0].id)
        const { redirect } = this.state;
       if(redirect) {
          return <Redirect to={{pathname: '/',state:{p:this.state.id}}}/>
         //return <Redirect to={{pathname: '/comment',state:{p:this.state.data[0].id}}}/>
          }
        
        var allposts = this.state.data.map(comment => <Comment key={comment.postid} comment={comment} />);
        return (
            <div className="dcontainer">
                <div className="dline1">
                    <p>Responses</p>
                </div>
                {/* <form action={`http://localhost:3000/users/posts/${this.state.id}/comments`} method="post"> */}
                <form onSubmit={this.handleSubmit} method="post">
                   
                    <div className="dline2">
                        <textarea className="textbox" onChange={this.handleCommentdataChange} type="text" id="mytext" rows="4" cols="48" placeholder="&#128172; Write a response" />

                    </div>
                    <input className="submitreply" type="submit" value="send" />
                </form>
                <div className="dline3">
                    <h3>Conversation between <span className="dhigh">{this.state.authorName}</span> and <span className="dhigh">Dave Feldman.</span></h3>
                </div>
                <div className="dcard1">
                    <div className="dprofile">
                        <div className="img">
                            <img src={require('./images/david.jpeg')} className="dimagestyle" style={{borderRadius: "50% 50%"}} alt="avatar" />
                        </div>
                        &nbsp;
                        <div className="dpname">
                            <p><span className="dhigh">David Martinz</span></p>
                            <p>Mar 29</p>
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
        var Date = this.props.comment.createdAt
        Date = Date.slice(0,10)
        return (
            <div className="d1container">
                <div className="dcard2">
                    <div className="dprofile">
                        <div className="img">
                            <img src={require('./images/profile2.png')} className="dimagestyle" style={{borderRadius: "50% 50%"}} alt="avatar" />
                        </div>
                        &nbsp;
                    <div className="dpname" id="post1">
                            <p><span className="dhigh">{this.props.comment.commentedby}</span></p>
                            {/* {allposts} */}
                            <p>{Date}</p>
                        </div>
                    </div>
                    <div className="dmsg">
                        <h3>{this.props.comment.commentdata}</h3>
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
