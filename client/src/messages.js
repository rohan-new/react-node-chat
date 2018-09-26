import React, { Component } from 'react';
import Moment from 'react-moment';

import  './chat.css' ;
import Chat from './Chat';




class Messages extends Component{

    

    render(){
        var name,username = [];
        var name = this.props.username ;
        var username = this.props.user ;
        var user = username[username.length - 1] ;

         
        return(

           
          <div>
         
          {this.props.message.map(message=>{
              return(
                 
                <div>
                    <div class="chat-sender msg"><strong><span class="texts">{user}</span></strong>
                      <div class="chatmsg">{message}</div>
                      <Moment fromNow >{Date.now()}</Moment>
                    </div>
                
                   <div class="clear"></div>
                   <br></br>
                </div>
                  
              )
          })}


        
          {this.props.selfmessage.map(message=>{
            return(
                <div >
                <div class="chat-sender msgs"><strong><span class="texts">{name}</span></strong>
                     <div class="chatmsgs">{message.text}</div>
                     <Moment fromNow >{Date.now()}</Moment>
                    </div>
                <div class="clear"></div>
                <br></br>
                </div>
            )
        })}
          
          
         
          <div className="clear"></div>
          </div>
        )
    }

}


export default Messages ;
