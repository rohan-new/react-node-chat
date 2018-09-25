import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import  axios from 'axios' ;

import Chat from './Chat' ;



  
  class Login extends Component{

    

    constructor() {
      super();
      this.state = { isAuthenticated: false, userID: '',name:'',picture:'', token: ''};
  }


    render(){

      const responseGoogle = (response) => {
        console.log(response);
        this.setState({
          isAuthenticated:true,
          name: response.profileObj.name,
          picture:response.profileObj.imageUrl
        })
        console.log(this.state.name)
        
    }

  
        return(
            

             
             <div >
              {this.state.isAuthenticated &&  

              <div>
               <Chat username={this.state.name} />
              </div>
              }
              {!this.state.isAuthenticated &&  
          <div>
            <GoogleLogin
            clientId="328362309560-roshgmr5j2cq729nvu73e2lnoj8qgsdu.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            style = {{width: 400,height:100,backgroundColor:'white',fontSize:18,boxSizing:"border-box",marginTop:250,marginLeft:450}}
            
            
          />
          </div>
              }
          </div>
         
            )
          
        
    }
  }

  export default Login ;