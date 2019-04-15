import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom'
//import {read} from './api-shop.js'
//import {listByShop} from './../product/api-product.js'
import Products from './Products'
import Button from '@material-ui/core/Button'
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

class MyArt extends Component {
  constructor({ match }) {
    super()
    this.state = {
      products: [],
      error: '',
    }
    this.match = match
    this.loadProducts = this.loadProducts.bind(this)
  }

  loadProducts = async () => {
    if(isEmpty(this.state.products)) 
      console.log('getting user artworks in my-art');
    //const data = await API.getByUser('artworksAPI', '/artworks/user', { body: {userId: this.props.userState.userId} });
    const data = await API.get('artworksAPI', '/artworks');
    if (data.error) {
      this.setState({ error: data.error })
      alert('error loading artworks:\n' + JSON.stringify(data.error))
    } else {
      let myProducts = data.data.filter((product, index) => {       
        return product.userId === this.props.userState.userId
      });
      this.setState({ products: myProducts })
    }
  }

  componentDidMount() {
    if (!this.props.userState.userLogged) { 
      return <Redirect to='/signin' />
    }
    this.props.handleForceReload()
  }
  
  componentWillReceiveProps() {
    this.loadProducts()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Typography type="title" component="h2" className={classes.productTitle}>
                The art I own
                <span className={classes.addButton}>
                  <Link to={"/product/new"}>
                    <Button color="primary" variant="contained">
                      Upload Artwork
                    </Button>
                  </Link>
                </span>
              </Typography>
              <div className={classes.divider}></div>
              <Products products={this.state.products} searched={false} />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}
MyArt.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(MyArt)

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}