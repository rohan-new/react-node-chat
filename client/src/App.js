import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
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
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  card: {
    minWidth: 100,
    maxWidth: 800,
    justify:'center',
    marginBottom: 100,
    marginTop:75,
    marginLeft: 230,
    backgroundColor: '#6A1B9A'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#C5CAE9',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});
class App extends Component{
  
  state = {
    open: false,
    opens:false,
    group: []
  };

 
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
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
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
        <Button>
        <SentIcon />
        </Button>
       

          </ListItem>
        </List>
      </Collapse>   


          <ListItem button onClick={this.handleClicks}>
            <ListItemIcon>
            <AddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Join a Group" />
            {this.state.opens ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.opens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Group1" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        
      </div>
      </Grid>
      </CardContent>
      </Card>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
