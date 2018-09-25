import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route}  from 'react-router-dom' ;




// Components
import  Chat from './Chat';

import Login from './login';



class Apps extends Component {
    
    render(){

    return(
        <BrowserRouter>
        <div>
      
        <Route path="/"  exact component ={Login} />
          
         
        </div>
        </BrowserRouter>
    )
    }

}


ReactDOM.render(<Apps />, document.getElementById('root'));
 
