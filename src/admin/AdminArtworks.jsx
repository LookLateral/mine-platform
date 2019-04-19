import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import Products from './../product/Products'
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

class AdminArtworks extends Component {
  constructor({ match }) {
    super()
    this.state = {
      url: null,
      title: null,
      products: [],
      error: '',
    }
    this.match = match
    this.loadProducts = this.loadProducts.bind(this)
  }

  loadProducts = async () => {
    if(isEmpty(this.state.products)) 
      console.log('getting artworks in adminArtworks');
    //const data = await API.getByUser('artworksAPI', '/artworks/user', { body: {userId: this.props.userState.userId} });
    const data = await API.get('artworksAPI', '/artworks');
    if (data.error) {
      this.setState({ error: data.error })
      alert('error loading artworks:\n' + JSON.stringify(data.error))
    } else {
      let loadProducts = data.data.filter((product, index) => {       

        if(this.state.url === 'all') return true
        else if(this.state.url === 'tag') return product.reqTag === true && product.reqVal === false && product.tagged === false
        else if(this.state.url === 'val') return product.reqTag === true && product.reqVal === true && product.tagged === false
        else if(this.state.url === 'tagged') return product.tagged === true
        else if(this.state.url === 'tokenizations') return product.reqTokenization === true && product.tokenized === false
        else if(this.state.url === 'tokenized') return product.tokenized === true 
        
        return false
      });
      this.setState({ products: loadProducts })
    }
  }

  componentDidMount() {
    if (!this.props.userState.userLogged || this.props.userState.userType !== 3)  { 
      return <Redirect to='/signin' />
    }
    this.props.handleForceReload()
  }
  
  componentWillReceiveProps() {
    const url = this.props.location.pathname.replace('/admin/artworks/', '').replace('/', '')
    let title = null
    if(url === 'all') title = "Uploaded Artworks"
    else if(url === 'tag') title = "Tag Requests" 
    else if(url === 'val') title = "Validation Requests" 
    else if(url === 'tagged') title = "Tagged Artworks" 
    else if(url === 'tokenizations') title = "Tokenization Requests" 
    else if(url === 'tokenized') title = "Tokenized Artworks" 
    else this.props.history.push('/admin');    
    
    this.setState({ url: url, title: title }, function() {
      this.loadProducts()
    })
    
    
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Typography type="title" component="h2" className={classes.productTitle}>
                { this.state.title }
              </Typography>
              <div className={classes.divider}></div>
              <Products products={this.state.products} searched={true} />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}
AdminArtworks.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(AdminArtworks)

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}