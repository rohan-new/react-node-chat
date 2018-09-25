import React, { Component } from 'react';
import Chat from './Chat'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';


class Online extends Component{

    render(){
        return(
            <div>
                    <SideNav>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                {this.props.names}
                            </NavText>
                        </NavItem>


                        {this.props.allusers.map(name=>{
                            return(
                             
                             
                             <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                          {name}
                        </NavText>
                       </NavItem>
                               
                             
                            )
                        })}


                        
                        {this.props.myname.map(name=>{
                            return(
                             
                             
                             <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                          {name}
                        </NavText>
                       </NavItem>
                               
                             
                            )
                        })}
                        
        
                    </SideNav.Nav>
                </SideNav>
                
                
            
           
            </div>
        )
    }
}

export default Online ;