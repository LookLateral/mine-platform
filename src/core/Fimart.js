import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
//import { Redirect, Link } from 'react-router-dom'
//import {read} from './api-shop.js'
//import {listByShop} from './../product/api-product.js'
import Fracts from './../fract/Fracts'
//import Button from '@material-ui/core/Button'
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
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
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
  productTitle: {
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

class Fimart extends Component {
  constructor({ match }) {
    super()
    this.state = {
      fracts: [],
      error: '',
    }
    this.match = match
    this.loadFracts = this.loadFracts.bind(this)
  }

  loadFracts = async () => {
    //const data = await API.getByViewable('artworksAPI', '/artworks/user', { body: {userId: this.props.userState.userId} });
    const data = await API.get('fractAPI', '/fracts');
    if (data.error) {
      this.setState({ error: data.error })
      alert('error Fimart loading artworks:\n' + JSON.stringify(data.error))
    } else {
      let fimartFracts = data.data.filter((fract, index) => {       
        return true
      });
      this.setState({ fracts: fimartFracts })
    }
  }

  componentDidMount() {
    /*if (!this.props.userState.userLogged) { 
      return <Redirect to='/signin' />
    }*/
    this.props.handleForceReload()
  }
  
  componentWillReceiveProps() {
    this.loadFracts()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Typography type="title" component="h2" className={classes.productTitle}>
                Fimart
              </Typography>
              <div className={classes.divider}></div>
              <Fracts fracts={this.state.fracts} searched={false} />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}
Fimart.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Fimart)
