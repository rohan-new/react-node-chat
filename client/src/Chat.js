import React,{Component} from 'react';
import ReactDOM from 'react-dom';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SentIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';



// components
import Online from './online';
import Login from './login'
import Messages from './messages';
import './App.css';

const io = require('socket.io-client');


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 350,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
    overflow: 'auto',
  },
  card: {
    minWidth: 100,
    maxWidth: 800,
    justify:'center',
    marginBottom: 100,
    marginTop:75,
    marginLeft: 230,
    backgroundColor: '#ffff',
    color: 'white'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});



class Chat extends Component {
    constructor(props) {
        super(props);


        this.state = {
          username: '',
          connectedusers:'',
          myname:[],
          allusers: [],
          message: '',
          user:[],
          messages: [],
          selfmessage:[],
          selfmessages:[],
          mobileOpen: false,
          open: false,
          opens:false,
          group: [],
          showing:true ,
          groupnames: [],
          sidebarOpen: true,
          
      };
       

      
   

        this.socket = io('localhost:3001');

        this.socket.on('newmessage', function(data){
            
            addMessage(data);
        });
    
        const addMessage = data => {
            
            this.setState({messages: [...this.state.messages, data.text]});
            this.setState({user:[...this.state.user, data.name]});
        };
    
        this.sendMessage = ev => {
            ev.preventDefault();
            
    
        }
       
    
        this.groupcreate = ev => {
            if(this.state.group.length != 0){
            this.setState({showing: false});
            this.socket.emit('room_name', {
                room: this.state.group,
                name: this.props.username
            })
           
        }
        }
    
    
       this.socket.on('roomnames',(data)=>{
         this.setState({groupnames:data.roomnames});
       })
       

      
        this.socket.on('groupjoined',(data)=>{
          this.setState({allusers:[...this.state.allusers,data.name]})
          this.socket.emit('newjoin',{
            name: this.props.username,
            id:data.id
          })
        })

        this.socket.on('myname',(data)=>{
           this.setState({myname:[...this.state.myname,data.name]})
        })

        

    
        this.socket.on('selfmessage',(data)=>{
            this.setState({selfmessages:[...this.state.selfmessages,data]});
        });

        this.socket.emit('myname',{
          name:this.state.username
        });

        this.socket.on('names',(data)=>{
          this.setState({
            connectedusers:data.names
          });
        })
    }
      
    
      
    
     
    
    
      handleChange =  event => {
        this.setState({
          group: event.target.value
        })
      };
    
     
      handleClick = () => {
        this.setState(state => ({ open: !state.open }));
      };
      handleClicks = () => {
        this.setState(state => ({ opens: !state.opens }));
        this.socket.emit('getroomnames',{
          text:'hi'
        });
      };

    



    
    

    submitMessage(e) {
        e.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
          message: this.state.selfmessage,
          room: this.state.group,
          name:this.props.username
      })
      this.setState({selfmessage: ''});
      ReactDOM.findDOMNode(this.refs.msg).value = "";
    }

    render() {
      const { classes, theme } = this.props;
     
        return (
            
          <div>

          {this.state.showing &&
        
            <div >
            <Card className={classes.card}>
           <CardContent>
           <Grid container justify="center">
           
            <div className={classes.root}>
              <List
                component="nav"
                subheader={<ListSubheader component="div">Chat App</ListSubheader>}
              >
               
              <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
              <CreateIcon />
              </ListItemIcon>
              <ListItemText inset primary="Create Group" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  
                <TextField
                id="filled-name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
                variant="filled"
              />
              <Button onClick = {this.groupcreate}>
              <SentIcon />
              </Button>
             
        
                </ListItem>
              </List>
            </Collapse>   
        
        
               
              </List>
              
            </div>
            </Grid>
            </CardContent>
            </Card>
            </div> }
        
          
            {!(this.state.showing) &&
          
            <div className="chatroom" >
                <h3>{this.state.group}</h3>
                <Online names={this.props.username}  allusers={this.state.allusers}  myname={this.state.myname}/>
              
                <ul className="chats" ref="chats">
                <Messages message = {this.state.messages} selfmessage = {this.state.selfmessages} username={this.props.username}  user={this.state.user} />
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" onChange={e => this.setState({selfmessage: e.target.value})} />
                    <input type="submit" value="Submit" />
                </form>
            </div>

            }

           </div>
        );
    }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Chat);