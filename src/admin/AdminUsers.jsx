import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { API } from 'aws-amplify';


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 2
  },
  boxInfo: {
    textAlign: 'left',
    border: '1px solid #dedede'
  },
  title: {
    fontWeight: 800,
    marginTop: 5,
    fontSize: '1.8em',
  },
  mailRight: {
    float: 'right',
    fontWeight: 'normal',
    marginRight: 20,
  },
  detail: {
    fontSize: '1.3em',
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: theme.palette.openTitle
  },
  addButton: {
    float: 'right',
    marginRight: "40px"
  },
  leftIcon: {
    marginRight: "8px"
  },
  userTitle: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  },
  divider: {
    height: 40,
    clear: 'both',
  },
})

class AdminUsers extends Component {
  constructor({ match }) {
    super()
    this.state = {
      url: null,
      title: null,
      users: [],
      error: '',
    }
    this.match = match
    this.loadUsers = this.loadUsers.bind(this)
  }

  loadUsers = async () => {
    if(isEmpty(this.state.users)) 
      console.log('getting users in adminUsers');
    //const data = await API.getByUser('artworksAPI', '/artworks/user', { body: {userId: this.props.userState.userId} });
    const data = await API.get('usersAPI', '/users');
    if (data.error) {
      this.setState({ error: data.error })
      alert('error loading users:\n' + JSON.stringify(data.error))
    } else {
      let loadUsers = data.data.filter((user, index) => {       

        if(this.state.url === '') return true
        //else if() return 
      
      });
      this.setState({ users: loadUsers })
    }
  }

  componentDidMount() {
    if (!this.props.userState.userLogged || this.props.userState.email.indexOf('@looklateral.com') === 0)  { 
      return <Redirect to='/signin' />
    }
    this.props.handleForceReload()
  }
  
  componentWillReceiveProps() {
    const url = this.props.location.pathname.replace('/admin/users/', '').replace('/', '')
    let title = null
    if(url === '') title = "Registered Users"
    //else if(url === '') title = "" 
    
    else this.props.history.push('/admin');    
    
    this.setState({ url: url, title: title }, function() {
      this.loadUsers()
    })
    
    
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Typography type="title" component="h2" className={classes.userTitle}>
                { this.state.title }
              </Typography>
              <div className={classes.divider}></div>
              
              <div className={classes.container}>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12}>
                      {this.state.users.map((user, i) => (
                        <div className={classes.artworkRow} key={user.id}> 
                            <div className={classes.boxInfo}>
                              <div className={classes.subheading}>
                                {/* SIMONOTES: static html */}
                                <div className={classes.title}>{user.firstName + ' ' + user.lastName}<span className={classes.mailRight}>{user.user_email}</span></div>
                                <div className={classes.detail}>User Type: {user.user_email.indexOf('@looklateral.com') > 0 ? 'Admin' : 'User'}</div>
                                <div className={classes.detail}>Missing details to complete the registration: Fimart not active</div>
                              </div>
                            </div>  
                        </div>
                      ))}
                  </Grid>
                </Grid>
              </div>
              
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}
AdminUsers.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(AdminUsers)

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}