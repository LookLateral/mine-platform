import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
//import FileUpload from 'material-ui-icons/FileUpload'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
//import {read, update} from './api-product.js'
//import auth from './../auth/auth-helper'
import { API } from 'aws-amplify';
import EmptyPic from '../assets/images/empty-pic.jpg';


const styles = theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class EditProduct extends Component {
  constructor({match}) {
    super()
    this.state = {
      id: null,
      userId: null,
      tokenizationId: null,
      name: null,
      artist: null,
      description: null,
      images: [],
      category: null,
      price: 0,
      dimensions: null,
      year: null,
      location: null,
      
      creationDate: null,
      viewable: false,

      reqTag: false,
      reqTagDate: null,
      tagSent: false,
      tagSentDate: false,
      reqVal: false,
      reqValDate: null,
      tagged: false,
      tagDate: null,

      reqTokenization: false,
      reqTokenizationDate: null,
      tokenqty: 1000000, //const
      tokenKept: 0, //% to keep
      tokenForSale: 0, //% to sell
      tokenName: null, //
      tokenSuggestedValue: null,
      tokenValue: null,
      tokenized: false, // = onSale
      tokenizationDate: null,
      buyback: false,

      redirect: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    this.productData = new FormData()
    if (!this.props.userState.userLogged) {
      return <Redirect to='/signin'/>
    }
    //this.loadProduct(this.match.params.productId)
    //this.forceUpdate()
    this.props.handleForceReload()
  }

  componentWillReceiveProps = (props) => {
    this.loadProduct(props.match.params.productId)
  }

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value)
    this.setState({ [name]: value })
  }

  handleCheckbox = name => event => {
    if(name === 'viewable')  this.setState({ viewable: !this.state.viewable });
  }

  handleUpdateArtworkSubmit = (e) => {
    e.preventDefault();

    // SIMONOTES: need to update old metadata in txn???
    console.log('updating artwork');
    this.updateArtwork();
    
  }

  loadProduct = async (productId) => {
    const data = await API.get('artworksAPI', '/artworks/' + productId);
    if (data.error) {
      this.setState({ error: data.error })
      alert('error loading artwork:\n' + JSON.stringify(data.error))
    } else {
      this.setState({ 
        id: data[0].id,
        userId: data[0].userId,
        tokenizationId: data[0].tokenizationId || null,
        name: data[0].name,
        artist: data[0].artist,
        description: data[0].description,
        images: [],
        category: data[0].category,
        price: data[0].price,
        dimensions: data[0].dimensions,
        year: data[0].year,
        location: data[0].location,

        creationDate: data[0].creationDate,
        viewable: data[0].viewable,

        reqTag: data[0].reqTag || false,
        reqTagDate: data[0].reqTagDate || null,
        tagSent: data[0].tagSent || false,
        tagSentDate: data[0].tagSentDate || null,
        reqVal: data[0].reqVal || false,
        reqValDate: data[0].reqValDate || null,
        tagged: data[0].tagged || false,
        tagDate: data[0].tagDate || null,

        reqTokenization: data[0].reqTokenization || false,
        reqTokenizationDate: data[0].reqTokenizationDate || null,
        tokenqty: data[0].tokenqty || 1000000,
        tokenKept: data[0].tokenKept || 0, 
        tokenForSale: data[0].tokenForSale || null,
        tokenName: data[0].tokenName || null, 
        tokenSuggestedValue: data[0].tokenSuggestedValue || null,
        tokenValue: data[0].tokenValue || null,
        tokenized: data[0].tokenized || false,
        tokenizationDate: data[0].tokenizationDate || null,
        buyback: data[0].buyback || false   
      })
    }
  }

  updateArtwork = async () => {
    if(this.state.name===null || this.state.artist===null){
      alert('Please complete all required fields'); 
      return false;
    } else {       
      const data = await API.post('artworksAPI', '/artworks/', {
        body: {
          id: this.state.id,
          userId: this.state.userId,
          tokenizationId: this.state.tokenizationId,
          name: this.state.name,
          artist: this.state.artist,
          description: this.state.description,
          images: [],
          category: this.state.category,
          price: this.state.price,
          dimensions: this.state.dimensions,
          year: this.state.year,
          location: this.state.location,

          creationDate: this.state.creationDate,
          viewable: this.state.viewable,
          
          reqTag: this.state.reqTag,
          reqTagDate: this.state.reqTagDate,
          tagSent: this.state.tagSent,
          tagSentDate: this.state.tagSentDate,
          reqVal: this.state.reqVal,
          reqValDate: this.state.reqValDate,
          tagged: this.state.tagged,
          tagDate: this.state.tagDate,

          reqTokenization: this.state.reqTokenization,
          reqTokenizationDate: this.state.reqTokenizationDate,
          tokenqty: this.state.tokenqty,
          tokenKept: this.state.tokenKept, 
          tokenForSale: this.state.tokenForSale,
          tokenName: this.state.tokenName, 
          tokenSuggestedValue: this.state.tokenSuggestedValue,
          tokenValue: this.state.tokenValue,
          tokenized: this.state.tokenized,
          tokenizationDate: this.state.tokenizationDate,
          buyback: this.state.buyback   
        }
      });   
      
      if (data.error) {
        this.setState({error: data.error})
      } else {
        console.log("Artwork update response:\n" + JSON.stringify(data));
        this.setState({error: '', redirect: true})
      }
    }
  }

  render() {
    /*const imageUrl = this.state.id
          ? `/api/product/image/${this.state.id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'*/
    const imageUrl = EmptyPic // ZUNOTE: need to fix

    if (this.state.redirect) {
      return (<Redirect to={'/product/' + this.state.id }/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Product
          </Typography><br/>
          <Avatar src={imageUrl} className={classes.bigAvatar}/><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Change Image
              {/*<FileUpload/>*/}
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField 
                id="name" 
                label="Name" 
                className={classes.textField} 
                value={this.state.name || ""} 
                onChange={this.handleChange('name')} 
                margin="normal"/><br/>
          <TextField 
                id="artist" 
                label="Artist" 
                className={classes.textField} 
                value={this.state.artist || ""} 
                onChange={this.handleChange('artist')} 
                margin="normal"/><br/>
          <TextField
                id="multiline-flexible"
                label="Description" 
                multiline
                rows="2"
                value={this.state.description || ""}
                onChange={this.handleChange('description')} 
                className={classes.textField}
                margin="normal"/><br/>
          <TextField 
                id="category" 
                label="Category" 
                className={classes.textField} 
                value={this.state.category || ""} 
                onChange={this.handleChange('category')} 
                margin="normal"/><br/>        
          {/*<TextField 
                id="quantity" 
                label="Quantity (field to be removed)" 
                className={classes.textField} 
                value={this.state.quantity || null} 
                onChange={this.handleChange('quantity')} 
                type="number" 
                margin="normal"/><br/>*/}
          <TextField 
                id="price" 
                label="Suggested Price" 
                className={classes.textField} 
                value={this.state.price !== 0 ? this.state.price : ""} 
                onChange={this.handleChange('price')} 
                type="number" 
                margin="normal"/><br/>
            <TextField 
                id="dimensions" 
                label="Dimensions" 
                className={classes.textField} 
                value={this.state.dimensions || ""} 
                onChange={this.handleChange('dimensions')} 
                margin="normal"/><br/>
            <TextField
                id="location"
                label="Location" 
                value={this.state.location || ""}
                onChange={this.handleChange('location')} 
                className={classes.textField}
                margin="normal"/><br/>
            <TextField
                id="year"
                label="Year" 
                value={this.state.year || ""}
                onChange={this.handleChange('year')} 
                className={classes.textField}
                margin="normal"/><br/>

            <FormControlLabel
                label="Want it visible in our Provenance section?"
                control={
                    <Checkbox
                        checked={this.state.viewable}
                        onChange={this.handleCheckbox('viewable')}
                        color="primary"
                      /> }/><br/>
          {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={this.handleUpdateArtworkSubmit} className={classes.submit}>Update</Button>
          <Link to={'/product/' + this.state.id } className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>)
  }
}

EditProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProduct)
