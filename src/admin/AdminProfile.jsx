import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
//import Button from 'material-ui/Button'
//import DeleteUser from './DeleteUser'
//import auth from './../auth/auth-helper'
//import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
//import config from './../../config/config'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }),
  blu: {color: 'blue',},
  subtitle: {
    fontSize: '2.0em', marginBottom: 30, lineHeight: 1,
    color: 'rgb(255,255,255,0.9)',  
  },
  spacer: { minHeight: 100, },
  fullBtn: {
    fontSize: 12, marginTop:10,
    borderStyle: 'solid', borderRadius: 4,
    width: 120, padding: 5,
  },
  btnblu: { backgroundColor: 'blue', color: '#fff', opacity: 0.9, },
  btngreen: { backgroundColor: 'green', color: '#fff', opacity: 0.9, },
  btnFloat: {
    float: 'left', marginLeft: 20,
  },
  section: {},
  sectionContainer: {},
  sectionTitle: {
    color: 'blue', fontSize: 22, 
    marginLeft: 20, marginBottom: 10, 
    fontWeight: 800,  
    textAlign: 'left',
  },
  sectionText: {
    fontSize: 20, width: '75%', float: 'left', textAlign: 'left', marginLeft: 20,
  },
})

class AdminProfile extends Component {

  componentDidMount() {
    if (!this.props.userState.userLogged) {
      return <Redirect to='/signin'/>
    }
  }

  render(){
    const { classes, userState } = this.props; 

    return (    
      <Paper className={classes.root} elevation={4}>
        
        <Typography className={classes.subtitle}>
          Ciao { userState.firstName }
        </Typography> 

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Registered Users</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>List all users registered into the platform, check for their missing fields, notes and activated services</div>
            <Link to={"/admin/users/"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>LIST</Button>
            </Link>
          </div>
        </div>
     
        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Uploaded Artworks</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>List all ...</div>
            <Link to={"admin/artworks/all"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>LIST</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Tag Requests</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>List all ...</div>
            <Link to={"admin/artworks/tag"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>LIST</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Tokenization Requests</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>List all ...</div>
            <Link to={"admin/artworks/tokenizations"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>LIST</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Tokenized Artworks</div>
          <div className={classes.sectionContainer}>
            <div className={classes.sectionText}>List all ...</div>
            <Link to={"admin/artworks/tokenized"}>
              <Button className={classes.fullBtn+' '+classes.btnblu+' '+classes.btnFloat}>LIST</Button>
            </Link>
          </div>
        </div>

        <div className={classes.spacer}></div>

      </Paper>
        
    )
  }
}
  
AdminProfile.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(AdminProfile);
  