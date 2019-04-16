import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
//import FileUpload from '@material-ui/icons/FileUpload'
//import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
//import {create} from './api-product.js'
import {Link, Redirect} from 'react-router-dom'
import { API } from 'aws-amplify';
import { writeArtworkToChain } from './../bigchain/uploadArtwork'

import * as util from 'util' // has no default export
import { inspect } from 'util' // or directly


const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class NewProduct extends Component {
  constructor({match}) {
    super()
    this.state = {
      id: null,
      userId: null,
      name: null,
      artist: null,
      description: null,
      image: [],
      images: [],
      category: null,
      //quantity: 0,
      price: 0,
      size: null,
      markings: null,

      creationDate: null,
      //txnId: null, // deprecated, txnId is the id of the artwork
      bucketId: null,

      viewable: false,
      tagged: false,
      tokenized: false,
      onSale: false,
      buyback: false,

      redirect: false,
      error: ''
    }
    this.match = match
    this.createArtwork = this.createArtwork.bind(this)
  }

  componentDidMount = () => {
    this.productData = new FormData()
    if (!this.props.userState.userLogged) {
        return <Redirect to='/signin'/>
    }
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

  handleCreateArtworkSubmit = (e) => {
    e.preventDefault();

   
    console.log('uploading artwork');

    let uploadDetails = {
      owner: this.props.userState.userId,
      name: this.state.name,
      artist: this.state.artist,       
    }

    let uploadMetadata = {
      image: this.state.images[0],
      value_usd: this.state.price,
      value_btc: null,
      location: null,
      size: this.state.size 
    }
    // ZUNOTE: need to get image!!

    //console.log('bigchain data:\nuploadDetails:\n' + JSON.stringify(uploadDetails) + '\nuploadMetadata:\n' + JSON.stringify(uploadMetadata));
    const txnUploadArtwork = writeArtworkToChain(uploadDetails, uploadMetadata)
    this.setState({ id: txnUploadArtwork }, function () { console.log(this.state.id)})

    // ZUNOTE: create bucket createBucket(txnUploadArtwork)

    // ZUNOTE: uploade image in bucket
    
    // set state: txnId, bucketPath, ...

    // this.createArtwork();
  }
  
  createArtwork = async () => {
    if(this.state.name===null || this.state.artist===null){
      alert('Please complete all required fields'); 
      return false;
    } else {              
      const data = await API.post('artworksAPI', '/artworks/', {
        body: {
          id: null,
          userId: this.props.userState.userId,
          name: this.state.name,
          artist: this.state.artist,
          description: this.state.description,
          images: [],
          category: this.state.category,
          //quantity: this.state.quantity,
          price: this.state.price,
          size: this.state.size,
          markings: this.state.markings,
          
          creationDate: Date('Y-m-d'),
          txnId: null,
          bucketId: null,
          
          viewable: this.state.viewable,
          tagged: false,
          tokenized: false,
          onSale: false,
          buyback: false,
          // ZUNOTE: enough?  
        }
      });   
      
      if (data.error) {
        this.setState({error: data.error})
      } else {
        console.log("Artwork creation response:\n" + JSON.stringify(data));
        this.setState({error: '', redirect: true})
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={"/users/" + this.props.userState.userId + "/" + this.props.userState.galleryId}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Artwork
          </Typography><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Photo
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
          {/*
          <TextField 
                id="quantity" 
                label="Quantity (field to be removed)" 
                className={classes.textField} 
                value={this.state.quantity || null} 
                onChange={this.handleChange('quantity')} 
                type="number" 
                margin="normal"/><br/>*/}
          <TextField 
                id="price" 
                label="Price" 
                className={classes.textField} 
                value={this.state.price !== 0 ? this.state.price : ""} 
                onChange={this.handleChange('price')} 
                type="number" 
                margin="normal"/><br/>
            <TextField 
                id="size" 
                label="Size" 
                className={classes.textField} 
                value={this.state.size || ""} 
                onChange={this.handleChange('size')} 
                margin="normal"/><br/>
            <TextField
                id="markings"
                label="Markings" 
                multiline
                rows="2"
                value={this.state.markings || ""}
                onChange={this.handleChange('markings')} 
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
          <Button color="primary" variant="contained" onClick={this.handleCreateArtworkSubmit} className={classes.submit}>Submit</Button>
          <Link to={"/users/" + this.props.userState.userId + "/" + this.props.userState.galleryId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewProduct)
