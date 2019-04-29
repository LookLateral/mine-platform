import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
//import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
//import Icon from '@material-ui/core/Icon'
//import {create} from './api-product.js'
import {Link, Redirect} from 'react-router-dom'
import { API } from 'aws-amplify';
import { writeArtworkToChain } from './../bigchain/uploadArtwork'
import { uploadFileInBucket } from './../bucket/manageBuckets.js'

//import * as util from 'util'

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
  /*input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }*/
  fileInput: {
    display: 'none !important'
  },
  imgPreview: {
    textAlign: 'center',
    margin: '30px 15px',
  },
  image:  {
    maxWidth: 300,
  },
  submitButton: {
    padding: 12,
    marginLeft: 10,
    background: '#fff',
    border: '4px solid #d3d3d3',
    borderRadius: 15,
    fontWeight: 700,
    fontSize: '10pt',
    cursor: 'pointer',
  }
})

class NewProduct extends Component {
  constructor({match}) {
    super()
    this.state = {
      id: null,
      tokenizationId: null,
      userId: null,
      name: null,
      artist: null,
      description: null,
      images: [],  
      imagePreviewUrl: '',
      imageName: '',
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
    this.createTransaction = this.createTransaction.bind(this)
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

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        images: file,
        imagePreviewUrl: reader.result,
        //imageName: this.state.id + '/pictures/' + file.name,
      });
    }
    reader.readAsDataURL(file)
  }

  handleCheckbox = name => event => {
    if(name === 'viewable')  this.setState({ viewable: !this.state.viewable });
  }

  handleCreateArtworkSubmit = (e) => {
    e.preventDefault();

    let uploadDetails = {
      owner: this.props.userState.userId,
      name: this.state.name,
      artist: this.state.artist,
      year: this.state.year,    
      dimensions: this.state.dimensions,   
    }

    let uploadMetadata = {
      //image: this.state.images,
      location: this.state.location,
      value_usd: this.state.price,
      value_btc: null,
    }

    const txnUploadArtwork = writeArtworkToChain(uploadDetails, uploadMetadata)
    this.setState({ 
      id: txnUploadArtwork, 
      imageName: txnUploadArtwork + '/pictures/' + this.state.images.name 
    
    }, function () {  
      uploadFileInBucket(this.state.imageName, this.state.images)
      this.createTransaction();     
    })
  }
  
  createTransaction = async () => {      
    if(this.state.name===null || this.state.artist===null){
      alert('Please complete all required fields'); 
      return false;
    } else {        
      const data = await API.post('txnAPI', '/txns/', {
        body: {
          id: this.state.id,
          artworkId: this.state.id,
          tokenizationId: null,
          giverUserId: null,
          receiverUserId: this.props.userState.userId,
          amount: null,
          operation: 'Uploaded',
          name: this.state.name,
          artist: this.state.artist,
          value_usd: null,
          value_look: null,
          percOwned: null,
          percToKeep: null,
          date: Date('Y-m-d')
        }
      });
      if (data.error) {
        this.setState({error: data.error})
        console.log("Error in Txn creation for upload:\n" + JSON.stringify(data.error));
      } else {
        console.log("Txn creation response for upload:\n" + JSON.stringify(data));
        this.createArtwork();
      }
    }
  }

  createArtwork = async () => {
    if(this.state.name===null || this.state.artist===null){
      alert('Please complete all required fields'); 
      return false;
    } else {   
      
      uploadFileInBucket(this.state.imageName, this.state.images);

      const body =  {
        id: this.state.id,
        userId: this.props.userState.userId,
        tokenizationId: this.state.tokenizationId || null,
        name: this.state.name,
        artist: this.state.artist,
        description: this.state.description,
        imageName: this.state.id + '/pictures/' + this.state.images.name,
        images: this.state.images,
        //imagePreviewUrl: this.state.imagePreviewUrl,
        category: this.state.category,
        price: this.state.price,
        dimensions: this.state.dimensions,
        year: this.state.year,
        location: this.state.location,      
        creationDate: Date('Y-m-d'),     
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

      console.log('bodyart\n' + JSON.stringify(body));

      const data = await API.post('artworksAPI', '/artworks/', {
        body: body
      });   
      
      if (data.error) {
        this.setState({error: data.error})
        console.log("Error in artwork creation:\n" + JSON.stringify(data.error));
      } else {
        console.log("Artwork creation response:\n" + JSON.stringify(data));
        //console.log("Artwork creation state:\n" + JSON.stringify(this.state));
        this.setState({error: '', redirect: true})
      }
    }
  }

  render() {
    
    const {classes} = this.props

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} className={classes.image} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image</div>);
    }

    if (this.state.redirect) {
      return (<Redirect to={"/users/" + this.props.userState.userId + "/" + this.props.userState.galleryId}/>)
    }
    
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Artwork
          </Typography><br/>
          
          {/*
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Picture
            </Button>
          </label> <span className={classes.filename}>{ this.state.image ? this.state.image.name : ''}</span><br/>
          */}
          <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmitImage(e)}>
              <input className={classes.fileInput}
                id="contained-button-imagePreview" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
              <label htmlFor="contained-button-imagePreview">
              <Button className={classes.submitButton} 
                variant="contained"
                component="span"
                onChange={(e)=>this._handleImageChange(e)}>
                Change Image
                </Button>
                </label>
            </form>
            <div className={classes.imgPreview}>
              {$imagePreview}
            </div>
          </div>

          <TextField 
                id="name" 
                label="Name"
                required 
                className={classes.textField} 
                value={this.state.name || ""} 
                onChange={this.handleChange('name')} 
                margin="normal"/><br/>
          <TextField 
                id="artist" 
                label="Artist" 
                required
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
                        
                      
          {/*
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          */}
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
