import React from 'react';
import {Redirect} from 'react-router';
import './Page1.css'
import './Page2.css'
import './Page3.css'
import './Page4.css'
import './newpost.css'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hai: 4
        }
    }
    render() {
        return (

            <Router>
                <div>
                    <Route exact path='/' component={Page1}></Route>

                    <Route
                        path='/page2'
                        render={(p) => <Page2 post={p} />}
                    />
                    <Route path='/page3/:postid' component={Page3} ></Route>
                    <Route exact path='/page4' component={Page4}></Route>
                    <Route exact path='/page5' component={page5}></Route>
                    <Route exact path='/page6' component={CreatePostEditor}></Route>
                </div>
            </Router>

        )
    }
}

class Page1 extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.fetch();
        if(window.sessionStorage.getItem("isLoggedIn")===null || window.sessionStorage.getItem("isLoggedIn")==="false"){
            console.log("clear!!")
        }
        else{
            document.getElementById("signupp").style.display="none"
            //window.sessionStorage.setItem("isLoggedIn","false")
            document.getElementById("signinn").innerHTML="Signout"
            //console.log("signed in!",window.sessionStorage.getItem("isLoggedIn"),window.sessionStorage.getItem("userName"))
        }
    }
    fetch() {


        var url = "http://localhost:3000/users/posts/";


        axios.get(url).then((response) => {
            // console.log(response)
            this.setState({
                data: response.data
            });
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }
    querytag= (event) => {
        
       var a=event.target
        console.log(a.innerHTML)
        var url = "http://localhost:3000/users/posts/tags/"+a.innerHTML;
         console.log(url)
        if(a.innerHTML !== "HOME"){
            axios.get(url).then((response) => {
                console.log(response)
               this.setState({
                   data: response.data
               });
           })
               .catch((e) => {
                   console.log("error");
                   console.log(e)
               });
        }
        else{
            this.fetch();
        }
    }

    handlsigninn =()=>{

        document.getElementById("signupp").style.display="none"
        //window.sessionStorage.setItem("isLoggedIn","false")
        document.getElementById("signinn").innerHTML="Signin"
        window.sessionStorage.setItem("isLoggedIn","false")

    }
    render() {
        
        var items = this.state.data.map(post => <Post key={post.id} post={post} />);
        return (

            <div className="parentpg1">
                <br /><br /><br />
                <div className="container">
                    <div className="row" id="signinbar">
                        <div className="col-sm-2 " id="signinbar1">
                            <b>
                                <h1>Medium</h1>
                            </b>
                        </div>
                        <div className="col-sm-4 " id="signinbar2">

                        </div>
                        <div className="col-sm-1 " id="signinbar3">
                            
                        </div>
                        <div className="col-sm-2 " id="signinbar4" style={{}}>

                            <Link to="/page5" style={{ textDecoration: 'none' }}><p id="signupp">Become a member</p></Link>

                        </div>
                        <div className="col-sm-1 " id="signinbar5">
                            <Link to="/page4" style={{ textDecoration: 'none' }}><p id="signinn" onClick={this.handlsigninn}>Sign in</p></Link>
                        </div>
                        <div className="col-sm-2 " id="signinbar6">
                            <button>
                               <Link to="/page6" style={{textDecoration:"none"}}>Get started</Link> 
                </button>
                        </div>

                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12 " id="navbar">
                            <ul>
                                <li><p className="home_nav" onClick={this.querytag}>HOME</p></li>
                                <li><p className="onezero_nav" onClick={this.querytag}>ONEZERO</p></li>
                                <li><p className="elemental_nav" onClick={this.querytag}>ELEMENTAL</p></li>
                                <li><p className="heated_nav" onClick={this.querytag}>HEATED</p></li>
                                <li><p className="tech_nav" onClick={this.querytag}>TECH</p></li>
                                <li><p className="startups_nav" onClick={this.querytag}>STARTUPS</p></li>
                                <li><p className="self_nav" onClick={this.querytag}>SELF</p></li>
                                <li><p className="politics_nav" onClick={this.querytag}>POLITICS</p></li>
                                <li><p className="health_nav" onClick={this.querytag}>HEALTH</p></li>
                                <li><p className="design_nav" onClick={this.querytag}>DESIGN</p></li>
                                <li><p className="human_parts_nav" onClick={this.querytag}>HUMAN PARTS</p></li>
                                <li><p className="more_nav" onClick={this.querytag}>MORE</p></li>

                            </ul>
                        </div>
                    </div>
                </div>


                <br /><br /><br /><br />

                <div className="container" id="post1">
                    {items}
                </div>


                <br /><br /><br />


            </div>

        )
    }
}

class Post extends React.Component {

    constructor() {
        super();


        this.state = {
            title: "Loading...",
            titledes: "Loading...",
            auth: "Loading...",
            readtimes: "Loading..."
        }
    }


    render() {
        //console.log(this.props.post.id)
        return (
            <Link to={{ pathname: '/page2', state: { p: this.props.post.id } }} style={{ textDecoration: 'none', color: 'black' }} >

                <div className="container" id="post1">
                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-11 ">
                            <div className="title1">
                                <h1>{this.props.post.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-10 ">
                            <div className="desc1">
                                <p>{this.props.post.title_des}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-11 ">
                            <div className="auth1">
                                <p>{this.props.post.auth_name}</p>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-8 ">
                            <div className="detail1">
                                <p>{this.props.post.read_times}<i className="material-icons" style={{ fontSize: "13px", margin: "5px" }}>grade</i></p>

                            </div>

                        </div>
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-1 ">
                            <i className="material-icons">bookmark_border</i>
                        </div>
                    </div>

                </div>
            </Link>
        )
    }
}

class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.post.location.state.p,
            data: {
                title: "Loading...",
                titledes: "Loading...",
                auth: "Loading...",
                readtimes: "Loading...",
                createdAt: ""
            }
        }
    }

    componentDidMount() {
        this.fetch();
        if(window.sessionStorage.getItem("isLoggedIn")===null || window.sessionStorage.getItem("isLoggedIn")==="false"){
            console.log("clear!!")
        }
        else{
            //document.getElementById("signupp").style.display="none"
            //window.sessionStorage.setItem("isLoggedIn","false")
            document.getElementById("signinn").innerHTML="Signout"
            //console.log("signed in!",window.sessionStorage.getItem("isLoggedIn"),window.sessionStorage.getItem("userName"))
        }
    }

    fetch() {


        var url = "http://localhost:3000/users/posts/" + this.state.id.toString();


        axios.get(url).then((response) => {

            this.setState({
                data: response.data
            });
            
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }
    handlsignout = () =>{
        document.getElementById("signinn").innerHTML="Signin"
        window.sessionStorage.setItem("isLoggedIn","false")        
    }

    render() {
        //console.log(this.props.post.location.state.p)
        var datecreated = this.state.data.createdAt;
        datecreated = datecreated.slice(0, 10)
        var postid = this.props.post.location.state.p;
        return (

            <div className="parentpg2">
                <br /><br /><br />
                <div class="container">
                    <div class="row" id="signinbar">
                        <div id="signinbar1">
                            <b>
                                <Link to="/" style={{ textDecoration: 'none' }}><h1>M</h1></Link>
                            </b>
                        </div>
                        <div id="signingap">

                        </div>

                        <div id="signinbar5">
                        <Link to="/page4" style={{ textDecoration: 'none' }}><p id="signinn" onClick={this.handlsignout}>Sign in</p></Link>
                        </div>
                        <div id="signinbar6">
                            <button>
                                Get started
                  </button>
                        </div>

                    </div>

                </div>
                <hr />


                <br /><br /><br /><br />


                <div class="container" id="titlebox">
                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>
                        <div class="col-lg-8 ">
                            <div class="post_title">
                                <h1>{this.state.data.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>



                        <div class="col-lg-8 ">
                            <div class="post_intro">
                                <p>{this.state.data.title_des}</p>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>
                        <br />
                        <br />

                        <div class="col-lg-1 " id="auth_img">
                            <img src="pika.png" alt="noimg.png"></img>

                        </div>


                        <div class="col-lg-3 ">

                            <div class="auth1">
                                <p>{this.state.data.auth_name}
                                    <button>
                                        Follow
                          </button>
                                </p>

                            </div>
                            <div class="detail1">
                                <p>{datecreated} . 4 min read <i class="material-icons" style={{ fontSize: "16px", margin: "5px" }}>grade</i></p>

                            </div>

                        </div>


                    </div>
                </div>


                <br /><br />


                <div class="container" id="post_essay">

                    <div class="row">
                        <div class="col-lg-1 ">

                        </div>

                        <div class="col-lg-10 ">
                            <div class="desc1">
                                {this.state.data.post_des}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1 ">

                        </div>
                        <br />

                        <div class="col-lg-9" id="cmntpagetag">

                            <Link to={`/page3/${postid}`}  style={{ textDecoration: 'none', color: '#51A97D' }}>
                                <h3>show responses</h3>
                            </Link>
                        </div>

                        <div class="col-lg-1 ">

                        </div>
                    </div>


                </div>
            </div>

        )
    }
}

class Page3 extends React.Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            data:[]
        }
        
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
       
       
        var c=this.props.match.params.postid
        var url = "http://localhost:3000/users/posts/" +c.toString() + "/comments";


        axios.get(url).then((response) => {

            this.setState({
                data: response.data
            });
            console.log(response,"........")
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }
   
      handleSubmit=(event)=> {
          if(window.sessionStorage.getItem("isLoggedIn") === "true")
          {
          console.log("data logged............")
          
        var c=this.props.match.params.postid
          const data=document.getElementById("newcomm").value
          
          var reqobj={
              postID:this.props.match.params.postid,
              commentData:data,
              commentBy:window.sessionStorage.getItem("userName")
          }
          var url = "http://localhost:3000/users/posts/" +c.toString() + "/comment";


          axios.post(url,reqobj).then((response) => {           
              console.log(response)
          })
              .catch((e) => {
                  console.log("error");
                  console.log(e)
              });
        
           //event.preventDefault();
      }
      else{
          event.preventDefault();
          alert("please signin before adding a comment");
      }
    }
    

    render() {
        //console.log(this.props.post.location.state)
        console.log(this.state)
        var items = this.state.data.map(comment => <Comment key={comment.id}comment={comment} />);
        return (

            <div className="parentpg3">
                <div class="container" id="box">

                    <div class="row" id="new_comment">
                        <div class="col-sm-12 ">
                            <h5>Responses</h5>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="write a response" id="newcomm" />
                                <input type="submit"  style={{visibility:"hidden"}} />
                            </form>
                            <br />
                            <hr />
                            <br /><br />
                            <p id="convo_group">Conversation for the post ...</p>
                            <br /><br />
                        </div>
                    </div>
                    {items}
             
                </div>
                
            </div>

        )
    }
}

class Comment extends React.Component {
  

render(){
    console.log(this.props.comment,".........")
    var datecreated=this.props.comment.createdAt
    datecreated=datecreated.slice(0,10)
    return(
        <div class="row">
        <div class="container" id="comment">
            <div class="row ">
            <div class="col-lg-1 " id="auth_img">
                    <img src="http://localhost:3001/pika.png" alt="noimg.png"/>

                </div>
                


                <div class="col-lg-3 ">

                    <div>
                        <p id="auth1">{this.props.comment.comment_by}</p>

                    </div>
                    <div>
                        <p id="detail1">{datecreated} </p>


                    </div>

                </div>
            </div>

            <div class="row">
                <p id="comment_text">{this.props.comment.comment_data}</p>
            </div>
            <div class="row" id="claps_tags">
                <div id="clap">
                    <img src="https://img.icons8.com/ios/50/000000/applause.png" alt="noimg.png" />
                </div>

                <div id="clapcount">
                    <p>2</p>
                </div>
                <div id="gap">

                </div>

                <div id="response">
                    {/* <p>1 response</p> */}
                </div>

                <div id="bookmark">

                    {/* <i class="material-icons" >bookmark_border</i> */}

                </div>

            </div>
        </div>
        
        </div>
   
    )
}
}
class Page4 extends React.Component {
    constructor(){
        super();
        this.state={
            success : false
        }
    }
    handlesignin=()=>{
        var email=document.getElementById("email").value
        var password=document.getElementById("password").value
        console.log(email,password)
        var reqob={
            email:email,
            password:password
        }
        axios.post("http://localhost:3000/users/signin",reqob).then((response)=>{
            if(response.data.length === 0){
                alert("Invalid username or password")
                window.sessionStorage.setItem("isLoggedIn",false)
            }
            else{
            
            window.sessionStorage.setItem("isLoggedIn",true)
            window.sessionStorage.setItem("userName",response.data[0].userName)
            window.sessionStorage.setItem("userId",response.data[0].id)
            this.setState({success:true})
            }
        })
        
    }
    render() {
        if(this.state.success){
            return <Redirect to="/"/>
        }
        else
        
        return (
            <div class="parentpg4">
                <br />
                
                
                
                <br /><br />




                <div class="container" id="post_essay">

                    <div class="d-flex justify-content-center" id="post_essay1">

                        <h1>Sign in with email</h1>
                    </div>

                    <div class="d-flex justify-content-center" id="post_essay2">
                        <p> <br /> Welcome back! Enter your email address and<br /> password to sign in and have unlimited reading! <br />  <br /> 
            </p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p>Your email</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="text" id="email" />
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p>Password</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="password" id="password" />
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay5">
                        <input type="button" value="Continue" onClick={this.handlesignin}/>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay6">
                    No account?<div>&nbsp;</div><div>&nbsp;</div><Link to="page5"> Create one</Link>
                    </div>
                </div>
                <br /><br /><br />
                
            </div>
        )
    }
}
class page5 extends React.Component {
    constructor(){
        super();
        this.state={
            success : false
        }
    }
    handlesignup= (e)=>{
        var userName=document.getElementById("name").value
        var email=document.getElementById("email").value
        var password=document.getElementById("password").value
        var image=document.getElementById("profile_picture").value
        console.log(email,password)
        var reqob={
            userName:userName,
            email:email,
            password:password,
            image:image
        }
        axios.post("http://localhost:3000/users/signup",reqob).then((response)=>{
            console.log(response)
            this.setState({success:true})
        })
        
    }
    
    render() {
        if(this.state.success){
            return <Redirect to="/page4"/>
        }
        else
        return (
            <div class="parentpg4">
                <br />
            
                
                <br /><br />




                <div class="container" id="post_essay">

                    <div class="d-flex justify-content-center" id="post_essay1">

                        <h1>Sign Up with email</h1>
                    </div>

                    <div class="d-flex justify-content-center" id="post_essay2">
                        <p><br/>Enter the email address and other details<br /> for your account , Happy reading!!
            </p>
                    </div>
                    <br />
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p>User Name</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="text" id="name" />
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p>Your email</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="text" id="email" />
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p> password</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="password" id="password" />
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay3">
                        <p> profile picture</p>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay4">
                        <input type="password" id="profile_picture" />
                    </div>
                    
                    <div class="d-flex justify-content-center" id="post_essay5">
                        <input type="button" value="Sign Up" onClick={this.handlesignup}/>
                    </div>
                    <div class="d-flex justify-content-center" id="post_essay6">
                        Already have account?<div>&nbsp;</div><Link to="page4">Sign in</Link>
                    </div>
                </div>
                
                
            </div>
        )
    }
}
class CreatePostEditor extends React.Component{

    handleSubmit=(event)=> {
        console.log("clickeddd!!")
        const postDescription=document.getElementById("postdata").value
        const title=document.getElementById("title").value
        const titleDescription=document.getElementById("titledes").value
        const tag=document.getElementById("tags").value
        const userId=parseInt(window.sessionStorage.getItem("userId"),10)
        const readTime=document.getElementById("readtime").value
        const subDomain=document.getElementById("subdomain").value
        var reqobj={ readTime,subDomain,userId,postDescription,title,titleDescription,tag}
        console.log(reqobj)
         var url = "http://localhost:3000/users/post";



          axios.post(url,reqobj).then((response) => {           
               console.log(response)
           })
               .catch((e) => {
                   console.log("error");
                   console.log(e)
               });
              // window.location.href = 'http://localhost:3001';
           // event.preventDefault();
      }
      
    render(){
        return(

            <div class="container newpost">
                <br/><br/>
                 <div className="row" id="signinbar">
                        <div className="col-sm-2 " id="signinbar1">
                            
                                <Link to="/" style={{textDecoration:"none"}}><h1 style={{backgroundColor:"black",color:"white",fontFamily:"times",display:"inline",paddingRight:"2%",paddingLeft:"2%",borderRadius:"3px"}}> <b>M </b></h1></Link>
                           
                        </div>
                        <div className="col-sm-4 " id="signinbar2">

                        </div>
                        <div className="col-sm-1 " id="signinbar3">
                          
                          
                        </div>
                        <div className="col-sm-2 " id="signinbar4">

                            

                        </div>
                        <div className="col-sm-1 " id="signinbar5">
                            
                        </div>
                        <div className="col-sm-2 " id="signinbar6">
                        Sign in
                        </div>

                    </div>
                    <br/><br/><br/>
            <div class="row">
                <div class="col-sm-1 ">
    
                </div>
                <div class="col-sm-4 ">
                    <b id="titlelabel">Story Prieview</b>
                </div>
                <div class="col-sm-2 ">
    
                </div>
                <div class="col-sm-5 ">
                    <p id="readtimeslabel"> Add Estimated time to go through your story so readers can have idea about post</p>
    
                </div>
                <div class="col-sm-2 ">
    
                </div>
            </div>
            <div class="row">
                <div class="col-sm-1 ">
    
                </div>
                <div class="col-sm-6 ">
                    <div class="desc1">
                        <textarea id="postdata" type="text" rows="8" placeholder="post data">
                                        </textarea>
                    </div>
                </div>
                <div class="col-sm-5 ">
    
                    <input id="readtime" type="text"/>
                    <p id="tagnote"> Add or change tags (up to 5) so readers know what your story is about</p>
                    <input id="tags" type="text"/>
                    <p id="note">Add Your Blog name or channel name to your story and we would show that up along with your post! </p>
                </div>
            </div>
    
            <div class="row">
                <div class="col-sm-1 ">
    
                </div>
                <div class="col-sm-5 ">
                    <input id="title" type="text" placeholder="title"/>

                    
                </div>
                <div class="col-sm-1 ">
    
    </div>
                <div class="col-sm-5 ">
                    <input id="subdomain" type="text"/>
                </div>
    
            </div>
            <div class="row">
                <div class="col-sm-1 ">
    
                </div>
                <div class="col-sm-5 ">
                    <input id="titledes" type="text" placeholder="title description"/>
    
                    <p id="note"> <b>Note:</b>Changes here will affect how your story appears in public places like Medium’s
                        homepage — not the story
                        itself.</p>
                </div>
                <div class="col-sm-1 ">
    
                    </div>
                <div class="col-sm-5 ">
                
               
                
                        <input id="publish" type="submit" value="Publish Now" onClick={this.handleSubmit}/>
                    </div>
            </div>
        </div>
    
        )
    }
}


export default App;











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
        .post(`http://localhost:3000/users/posts/${this.state.id}/comments`, comment)
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
        .post(`http://localhost:3000/users/posts/${this.state.id}/comments`, comment)
        .then((res) => {
            let obj = {}
            obj.user = {}
            obj.user.commentBy= window.localStorage.getItem("userName")
            obj.user.image= window.localStorage.getItem("image")
            obj.commentData= res.data.commentData
            obj.createdAt= res.data.createdAt

            let existingData = this.state.data.splice();
            existingData.unshift(obj);
            this.setState({
                data: existingData,
            })
            console.log('set thestate')
        }) 
        .catch((e) => {
            console.error(e)
        });

        form.reset();

    } else {
        alert('please sign in before add comment');
    }
};













import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import LoginComponent from './LoginComponent';
  import DataComponent from './DataComponent';
  import PageComponent from './PageComponent';
  import PostComponent from './PostComponent';
  // import SigninComponent from './SigninComponent';
  // import SignoutComponent from './SignoutComponent';
 class HeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      };
    }

    handleSignin = () => {
      document.getElementById('Signin').innerHTML = "signin"
      window.localStorage.setItem("isLoggedIn","false")
      
      // window.localStorage.setItem("userName","Null")
      // window.localStorage.setItem("userid","Null")
    }

    componentDidMount() {
      //this.fetch();
      var userName = window.localStorage.getItem("isLoggedIn");
      if(userName === "true" ) {
        document.getElementById('Signin').innerHTML = "Sign out"
        document.getElementById('Hello').innerHTML = "Hello userName"
      } else {
        document.getElementById('Signin').innerHTML = "Sign in"
      }
    }

        
    

      render() {
        return(
        <div className="Hmain-container">
          <div className="det1">
            <div className="img1">
            <Link to='/'>
              <img src={require('./images/learnhigh.jpeg')} style={{color: 'black'}} alt="avatar" />
            </Link>
            </div>
            <div className="logo" style={{fontSize: '130%', fontStretch: 'ultra-condensed', fontFamily: 'italic', width: '60%'}}>
                <h1>learnHigh</h1>
            </div> 
          </div>
          <div className="det">
              
            <div className="mem">
                <a>Hello</a> 
            </div> &nbsp;&nbsp;&nbsp;
            <div className="login-form">
            <Link className="nav-link" to='/login'>
                <a style={{color: 'green', textDecorationLine: 'none'}} id="Signin" onClick={this.handleSignin}>signin</a> 
            </Link>  
            </div> &nbsp;&nbsp;&nbsp;
            <div className="login-form1">
            <Link className="nav-link" to='/post'>         
                <a style={{color: 'green', textDecorationLine: 'none'}} className="rect">Add Post</a>
            </Link>
            </div>
          </div>            
        </div>  
        );
      }
   }


export default HeaderComponent;
